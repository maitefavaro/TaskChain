from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pessoa, Projeto, Tarefa
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = ['id', 'usuario', 'nome', 'email', 'is_gerente']  # Ajustei para 'usuario' e removi 'status'

class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = '__all__'

class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(write_only=True)
    is_gerente = serializers.BooleanField(write_only=True, default=False)  # novo campo

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'nome', 'is_gerente']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        nome = validated_data.pop('nome')
        is_gerente = validated_data.pop('is_gerente', False)  # pega o campo is_gerente
        user = User.objects.create_user(**validated_data)
        Pessoa.objects.create(
            usuario=user,
            nome=nome,
            email=validated_data.get('email'),
            is_gerente=is_gerente  # salva aqui
        )
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Pega o usuário autenticado
        user = self.user

        try:
            pessoa = Pessoa.objects.get(usuario=user)
            data['is_gerente'] = pessoa.is_gerente
            data['nome'] = pessoa.nome
        except Pessoa.DoesNotExist:
            data['is_gerente'] = False
            data['nome'] = ''

        return data