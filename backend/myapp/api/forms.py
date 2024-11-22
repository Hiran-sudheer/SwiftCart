
from django import forms
from django.forms import inlineformset_factory
from mysite.models import *
from django.contrib.auth import authenticate

class ProductManagementForm(forms.ModelForm):
    class Meta:
        model = ProductManagement
        fields = '__all__'

SpecificationsFormSet = inlineformset_factory(
    ProductManagement, 
    Specifications,
    fields=('name', 'value'),
    extra=1, 
    can_delete=True
)

# 
from django.contrib.auth.forms import UserCreationForm


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email','phone_number', 'password1', 'password2')


class CustomAuthenticationForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user or not user.is_active:
                raise forms.ValidationError('Invalid username or password')
        
        return cleaned_data
