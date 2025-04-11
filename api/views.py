from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from api.models import Pessoa
from rest_framework import viewsets
from .serializers import PessoaSerializer

@api_view(['POST'])
def register(request):
    print("Dados recebidos:", request.data)

    nome = request.data.get('nome')
    email = request.data.get('email')
    senha = request.data.get('senha')

    if not nome or not email or not senha:
        return Response({'error': 'Preencha todos os campos.'}, status=400)

    # Verifica se já existe um usuário com este email (como username)
    if User.objects.filter(username=email).exists():
        return Response({'error': 'Usuário já existe.'}, status=400)

    # Cria o usuário usando o email como username
    user = User.objects.create_user(username=email, email=email, password=senha)

    # Cria a Pessoa associada
    Pessoa.objects.create(usuario=user, nome=nome, email=email)

    return Response({'message': 'Usuário criado com sucesso!'}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_logado(request):
    pessoa = Pessoa.objects.get(usuario=request.user)
    return Response({
        'nome': pessoa.nome,
        'email': pessoa.email,
    })



class PessoaViewSet(viewsets.ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer


from .models import Pessoa, Tarefa
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def pedir_ajuda(request, tarefa_id):
    try:
        tarefa = Tarefa.objects.get(id=tarefa_id)
        if tarefa.status == 'ajuda':
            # Procurar a pessoa com menos tarefas em andamento
            pessoas = Pessoa.objects.all()
            pessoa_disponivel = min(pessoas, key=lambda p: p.tarefas.filter(status='andamento').count(), default=None)
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
