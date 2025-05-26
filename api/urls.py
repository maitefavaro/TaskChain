from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register, usuario_logado, pedir_ajuda, PessoaViewSet, ColaboradoresListView, TarefaViewSet, ProjetoViewSet
from .custom_auth import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import projetos_do_colaborador

router = DefaultRouter()
router.register(r'pessoas', PessoaViewSet)
router.register(r'tarefas', TarefaViewSet)
router.register(r'projetos', ProjetoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register, name='register'),
    path('usuario-logado/', usuario_logado),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),       # refresh
    path('colaboradores/', ColaboradoresListView.as_view(), name='colaboradores'),
    path('tarefas/<int:tarefa_id>/pedir-ajuda/', pedir_ajuda, name='pedir_ajuda'),
    path('projetos-do-colaborador', projetos_do_colaborador),
]
