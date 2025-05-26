from django.db import models
from django.contrib.auth.models import User


class Pessoa(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    is_gerente = models.BooleanField(default=False)  # 👈 campo adicionado

    def __str__(self):
        return self.nome


class Projeto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()

    def __str__(self):
        return self.nome


class Tarefa(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    responsavel = models.ForeignKey(Pessoa, on_delete=models.SET_NULL, null=True, related_name='tarefas')
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='tarefas')
    concluida = models.BooleanField(default=False)

    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('andamento', 'Em andamento'),
        ('concluida', 'Concluída'),
        ('ajuda', 'Preciso de ajuda'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')

    data_criacao = models.DateTimeField(auto_now_add=True)
    data_conclusao = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.titulo
