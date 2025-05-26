Aqui vai o passo a passo para executar o projeto em sua máquina:

Back-end:
1. Iniciar um novo termial

2. Acessar a pasta do backend
cd backend

3. Criar e ativar o ambiente virtual (recomendado)
Windows:
python -m venv venv
venv\Scripts\activate

Mac/Linux:
python3 -m venv venv
source venv/bin/activate

4. Instalar as dependências
pip install -r requirements.txt

5. Rodar as migrações
python manage.py makemigrations
python manage.py migrate

6. Criar superusuário (opcional)
python manage.py createsuperuser

7. Rodar o servidor backend
python manage.py runserver
O backend vai rodar em: http://127.0.0.1:8000

Frontend (React)

8. Abrir nova aba do terminal e ir para a pasta do frontend
cd frontend

9. Instalar as dependências
npm install

10. Rodar o frontend
npm start
O frontend normalmente abre em: http://localhost:3000