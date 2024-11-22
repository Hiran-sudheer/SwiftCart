from django.urls import path
from .views import *

urlpatterns = [
    path('',index,name='index'),

   


    path('registers/', UserRegistrationView.as_view(), name='user-registration'),
    path('loginss/', UserLoginView.as_view(), name='user-login'),
    path('UserLogoutView/',UserLogoutView.as_view(),name='UserLogoutView'),

    # adress
    path("Address/",AddressCreateView.as_view(),name='AddressCreateView'),
 
    # all categories
    path('categories/', CategoryAPI.as_view(), name='category-list'),

    #  categories by shop name
    path('categoriesby/<str:shop_name>/', CategoryByShopAPIView.as_view(), name='categories_by_shop_api'),

    # all shops
    path("shopapi",ShopAPI.as_view(),name='shopapi'),
    #
    path('products/<int:category_id>/', ProductListByCategory.as_view(), name='product-list-by-category'),

    # path('shop-products/<str:shop_name>/<str:category_name>/', ShopProductListView.as_view(), name='shop-products-api'),

    # products by shop name and category
    path('productby/<str:shop_name>/<int:category_id>/', ProductListByShopCateg.as_view(), name='product-list-by-shop-category'),

    # for carousel
    path('shops/<str:Shopname>/', ShopSAPI.as_view(), name='shop-detail'),

   

    # path('productbyshop/<str:Shop_name>/',ProductListByShop.as_view(),name='productbyshop')
     path('productbyshop/<str:shop_name>/<int:product_id>/', ProductListByShop.as_view(), name='product_by_shop'),


    #  cart

    path('cartview/',cartview.as_view(),name='cartview'),


     
# ///////////////////////////////////
    path('manage_product/<int:product_id>/', manage_product, name='manage_product'),

    path("add_product",add_product,name='add_product'),
    path('register',register,name='register'),
    path('login',user_login,name='login')

    
]