from django.urls import path
from . import views


urlpatterns = [
    path('',views.home, name='home'),
    path('eligibility/',views.eligibility,name='eligibility'),
    path('working/', views.working, name='working'),
    path('test/',views.test,name='test',),
    path('application/',views.appln , name='application'),
    path('predictor/',views.predictor, name='predictor')
]
