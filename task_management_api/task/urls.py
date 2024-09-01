from django.urls import path
from .views import TaskCreateView, TaskListView, TaskUpdateView, TaskDeleteView, UserCreateView, UserListView, LoginView, LogoutView

urlpatterns = [
    path('tasks/', TaskListView.as_view(), name='task-list'),
    path('tasks/create/', TaskCreateView.as_view(), name='task-create'),
    path('tasks/update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('tasks/delete/<int:pk>/', TaskDeleteView.as_view(), name='task-delete'),
    path('signup/', UserCreateView.as_view(), name='user-signup'),
    path('users/', UserListView.as_view(), name='user-list'),  # New endpoint to list users
    path('login/', LoginView.as_view(), name='user-login'),
    path('logout/', LogoutView.as_view(), name='user-logout'),
]
