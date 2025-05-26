from rest_framework.permissions import BasePermission

class IsGerente(BasePermission):
    """
    Permite acesso apenas a usuários que são gerentes.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.pessoa.is_gerente


class IsColaborador(BasePermission):
    """
    Permite acesso apenas a usuários que NÃO são gerentes.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and not request.user.pessoa.is_gerente
