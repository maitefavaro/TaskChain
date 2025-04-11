# backend/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import JsonResponse
def home(request):
    return JsonResponse({"message": "API do TaskChain está no ar!"})

urlpatterns = [
    path('', home),  # <- isso resolve o erro 404 no domínio raiz
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("api.urls")),
]
