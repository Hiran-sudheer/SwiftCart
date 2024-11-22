from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics,permissions,status
from mysite.models import *
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken,Token
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated 

# Create your views here.
def index(request):
    return HttpResponse("api")



class AddressCreateView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
      
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)





class UserRegistrationView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CustomUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)





from rest_framework_simplejwt.tokens import RefreshToken
# ////////////
class UserLoginView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)  # Generate refresh token
        login(request,user)


        # Additional information about the logged-in user
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'phone_number': user.phone_number,
           
        }

        return Response({
            'success': True,
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': user_data,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)

from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Get the refresh token from the request data
            refresh_token = request.data.get('refresh_token')

            if not refresh_token:
                raise ValueError('Refresh token not provided')

            # Verify if the refresh token is valid
            token = RefreshToken(refresh_token)
            token.verify()

            # Blacklist the refresh token to invalidate it
            token.blacklist()

            # Provide a successful response
            return Response({'success': True, 'message': 'Logout successful'}, status=status.HTTP_200_OK)

        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# categories only
class CategoryAPI(generics.ListCreateAPIView):
    serializer_class = CategorySerializers
    queryset = Category.objects.all()


# categories by shop name
class CategoryByShopAPIView(generics.ListAPIView):
    serializer_class = CategorySerializers

    def get_queryset(self):
        shop_name = self.kwargs['shop_name']
        try:
            shop = Shop.objects.get(Shopname=shop_name)
            return shop.category.all()
        except Shop.DoesNotExist:
            return Category.objects.none()

# all shops
class ShopAPI(generics.ListCreateAPIView):
    serializer_class=ShopSerializers
    queryset=Shop.objects.all()




class ShopSAPI(generics.ListAPIView):
    serializer_class = ShopSAPISerializers

    def get_queryset(self):
        Shopname = self.kwargs['Shopname']
        return Shop.objects.filter(Shopname=Shopname)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        # Transform the serializer data into the desired format
        banners = []
        for key, value in serializer.data[0].items():
            banners.append({key: value})

        return Response(banners)

# products according to category
class ProductListByCategory(generics.ListAPIView):
    serializer_class = ProductSerializers

    def get_queryset(self):
        category_name = self.kwargs['category_id']
        return ProductManagement.objects.filter(Category__id=category_name)

   
    
# products according to shop name and category    
class ProductListByShopCateg(generics.ListAPIView):
    serializer_class = ProductSerializers

    def get_queryset(self):
        shop_name=self.kwargs['shop_name']
        category_id = self.kwargs['category_id']

        return ProductManagement.objects.filter(Category__id=category_id,Shop__Shopname=shop_name)
    
class ProductListByShop(generics.ListAPIView):
    serializer_class = ProductSerializers

    def get_queryset(self):
        shop_name = self.kwargs['shop_name']
        product_id=self.kwargs['product_id']

        return ProductManagement.objects.filter(Shop__Shopname=shop_name,id=product_id)
    
#  def get_queryset(self):
#         Shopname = self.kwargs['Shopname']
#         return Shop.objects.filter(Shopname=Shopname)
    
    # related_model_name = serializers.ReadOnlyField(source='related_model.name')

class cartview(generics.ListCreateAPIView):
    serializer_class=CartSerializer
    queryset=Cart.objects.all()

# //////////////////////////////////////////////////////////////////////////////////////////
from django.shortcuts import render, get_object_or_404
from django.forms import inlineformset_factory

from .forms import ProductManagementForm, SpecificationsFormSet

def manage_product(request, product_id):
    product = get_object_or_404(ProductManagement, pk=product_id)

    if request.method == 'POST':
        form = ProductManagementForm(request.POST,request.FILES, instance=product)
        formset = SpecificationsFormSet(request.POST,request.FILES, instance=product)

        if form.is_valid() and formset.is_valid():
            form.save()
            formset.save()
            # Redirect or do something else upon successful form submission
            print('done')

    else:
        form = ProductManagementForm(instance=product)
        formset = SpecificationsFormSet(instance=product)

    return render(request, 'api/manage_product.html', {'form': form, 'formset': formset})

from django.shortcuts import render, redirect
from .forms import ProductManagementForm, SpecificationsFormSet

def add_product(request):
    if request.method == 'POST':
        form = ProductManagementForm(request.POST, request.FILES)
        formset = SpecificationsFormSet(request.POST, request.FILES)

        if form.is_valid() and formset.is_valid():
            product = form.save()  
            formset.instance = product  
            formset.save()
            # return redirect('success_page')  # Redirect to success page or another view
            print('done')
    else:
        form = ProductManagementForm()
        formset = SpecificationsFormSet()

    return render(request, 'api/add_product.html', {'form': form, 'formset': formset})


# myapp/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import *

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  
            # return redirect('home')  # Replace 'home' with the name of your home view or URL
            print('done')
    else:
        form = CustomUserCreationForm()

    return render(request, 'api/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return HttpResponse("you are logged in")
                
    else:
        form = CustomAuthenticationForm()

    return render(request, 'api/login.html', {'form': form})

#  cart

