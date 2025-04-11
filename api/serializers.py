from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pessoa, Projeto, Tarefa
from .models import Pessoa

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = [
        'status','id', 'user', 'nome']

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

    class Meta:
        model = User
        fields = [
        'status','username', 'password', 'email', 'nome']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        nome = validated_data.pop('nome')
        user = User.objects.create_user(**validated_data)
        Pessoa.objects.create(user=user, nome=nome, email=validated_data.get('email'))
        return user