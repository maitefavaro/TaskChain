from django.urls import path, include
from .views import register, usuario_logado
from rest_framework.routers import DefaultRouter
from .views import PessoaViewSet
from .custom_auth import CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'pessoas', PessoaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register, name='register'),
    path('usuario-logado/', usuario_logado),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

]
