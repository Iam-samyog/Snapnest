from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns=[
    #previous Login url
    #path ('Login',views.user_Login,name='login),
    #Login /Logout urls
    
    path('login/',views.user_login,name='login'),
    path('logout/',auth_views.LogoutView.as_view(),name='logout'),
]