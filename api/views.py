from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from api.models import Pessoa, Tarefa
from rest_framework import viewsets
from .serializers import PessoaSerializer, TarefaSerializer
from .permissions import IsGerente, IsColaborador
from rest_framework.views import APIView


@api_view(['POST'])
def register(request):
    print("Dados recebidos:", request.data)

    nome = request.data.get('nome')
    email = request.data.get('email')
    senha = request.data.get('senha')
    tipo_usuario = request.data.get('tipo_usuario')  # gestor ou funcionario

    if not nome or not email or not senha or not tipo_usuario:
        return Response({'error': 'Preencha todos os campos.'}, status=400)

    if User.objects.filter(username=email).exists():
        return Response({'error': 'Usuário já existe.'}, status=400)

    user = User.objects.create_user(username=email, email=email, password=senha)

    is_gerente = tipo_usuario == 'gestor'  # True se for gestor

    Pessoa.objects.create(usuario=user, nome=nome, email=email, is_gerente=is_gerente)

    return Response({'message': 'Usuário criado com sucesso!'}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_logado(request):
    try:
        pessoa = Pessoa.objects.get(usuario=request.user)
        return Response({
            'nome': pessoa.nome,
            'email': pessoa.email,
            'is_gerente': pessoa.is_gerente
        })
    except Pessoa.DoesNotExist:
        return Response({'error': 'Pessoa não encontrada.'}, status=404)


class PessoaViewSet(viewsets.ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer
    permission_classes = [IsAuthenticated, IsGerente]


class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            pessoa = Pessoa.objects.get(usuario=user)
        except Pessoa.DoesNotExist:
            return Tarefa.objects.none()
        if pessoa.is_gerente:
            return Tarefa.objects.all()
        return Tarefa.objects.filter(responsavel=pessoa)


@api_view(['POST'])
def pedir_ajuda(request, tarefa_id):
    try:
        tarefa = Tarefa.objects.get(id=tarefa_id)
        if tarefa.status == 'ajuda':
            pessoas = Pessoa.objects.all()
            pessoa_disponivel = min(
                pessoas,
                key=lambda p: p.tarefas.filter(status='andamento').count(),
                default=None
            )
            if pessoa_disponivel:
                tarefa.responsavel = pessoa_disponivel
                tarefa.save()
                return Response({'mensagem': f'Ajuda atribuída a {pessoa_disponivel.nome}'})
            else:
                return Response({'mensagem': 'Nenhuma pessoa disponível encontrada.'})
        else:
            return Response({'mensagem': 'A tarefa não está com status de ajuda.'})
    except Tarefa.DoesNotExist:
        return Response({'erro': 'Tarefa não encontrada.'}, status=404)


class ColaboradoresListView(APIView):
    def get(self, request):
        colaboradores = Pessoa.objects.filter(is_gerente=False)
        serializer = PessoaSerializer(colaboradores, many=True)
        return Response(serializer.data)


from .models import Projeto
from .serializers import ProjetoSerializer

class ProjetoViewSet(viewsets.ModelViewSet):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def projetos_do_colaborador(request):
    user = request.user
    try:
        pessoa = Pessoa.objects.get(usuario=user)
    except Pessoa.DoesNotExist:
        return Response({'erro': 'Pessoa não encontrada'}, status=404)

    # Busca tarefas atribuídas ao colaborador
    tarefas = Tarefa.objects.filter(responsavel=pessoa)
    
    # Pega os projetos únicos dessas tarefas
    projetos = Projeto.objects.filter(tarefas__in=tarefas).distinct()

    resposta = []
    for projeto in projetos:
        tarefas_projeto = tarefas.filter(projeto=projeto)
        resposta.append({
            'id': projeto.id,
            'nome': projeto.nome,
            'descricao': projeto.descricao,
            'tarefas': [
                {
                    'id': t.id,
                    'titulo': t.titulo,
                    'status': t.status,
                }
                for t in tarefas_projeto
            ]
        })

    return Response(resposta)
