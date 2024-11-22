from rest_framework import serializers
from mysite.models import *


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"

class ShopSerializers(serializers.ModelSerializer):
    
    category = serializers.StringRelatedField(many=True)

    class Meta:
        model=Shop
        fields="__all__"

class ShopSAPISerializers(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('Banner1', 'Banner2', 'Banner3')

class SpecificationsSerializers(serializers.ModelSerializer):
    class Meta:
        model=Specifications
        fields="__all__"

class ProductSerializers(serializers.ModelSerializer):
    Category=CategorySerializers()
    specifications = SpecificationsSerializers(many=True, read_only=True)
    
    class Meta:
        model=ProductManagement
        fields="__all__"




class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number']
        )
        return user

    class Meta:
        model = CustomUser
        fields = ("id", "username", "password", "email", 'phone_number')


# myapp/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Create a new user with the provided data
        user = get_user_model().objects.create_user(**validated_data)
        return user

# myapp/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                data['user'] = user
            else:
                raise serializers.ValidationError('Invalid credentials')
        else:
            raise serializers.ValidationError('Must include "username" and "password"')

        return data
    
    # yourapp/serializers.py
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id','user', 'street', 'city', 'state', 'zip_code']


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields='__all__'


