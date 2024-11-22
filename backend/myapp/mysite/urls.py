from django.urls import path
from .views import RenewSubscriptionView 
from .views import loadCategoryId, fetch_assigned_variants,fetch_assigned_category
from .views import index, user_logout

from .views import loadCategoryByShopIds


# from .views import search_results
from . import views

urlpatterns = [
    path('mysite/login', views.index, name='index'),
    path('logout', user_logout, name='logout'),
    
    path('admin/', views.admin, name='admin'),
    path('', views.admin, name='dashboard'),
   
    path('admin/shoptypelist', views.shoptypelist, name='shoptypelist'),
    path('editshoptype/<int:pk>/', views.editshoptype, name='editshoptype'),
 
    path('shoptype/<int:pk>/block/', views.block_shoptype, name='block_shoptype'),
    path('shoptype/activate/<int:pk>/', views.activate_shoptype, name='activate_shoptype'),
    path('admin/search_shoptype/', views.search_shoptype, name='search_shoptype'),

    path('admin/addshoptype', views.addshoptype, name='addshoptype'),
    path('admin/Categorylist', views.Categorylist, name='Categorylist'),
    path('admin/addCategory', views.addCategory, name='addCategory'),
    path('admin/search_Category/', views.search_Category, name='search_Category'),
    path('editCategory/<int:pk>/', views.editCategory, name='editCategory'),

    path('admin/varientlist', views.varientlist, name='varientlist'),
    path('admin/addvarient', views.addvarient, name='addvarient'),
    path('editvarient/', views.editvarient, name='editvarient'),

    path('admin/save_assigned_variants', views.save_assigned_variants, name='save_assigned_variants'),
    path('admin/assignvarientlist', views.assignvarientlist, name='assignvarientlist'),
    
    path('admin/fetchAssignedVariants/', views.fetch_assigned_variants, name='fetch_assigned_variants'),

    path('admin/loadCategoryByShopId/<int:id>', views.loadCategoryByShopId, name='loadCategoryByShopId'),

    path('admin/shoplist', views.shoplist, name='shoplist'),
    path('admin/addShop', views.addshop, name='addShop'),
    path('shop/<int:pk>/block/', views.block_shop, name='block_shop'),
    path('shop/activate/<int:pk>/', views.activate_shop, name='activate_shop'),
    path('admin/search_shop/', views.search_shop, name='search_shop'),
    path('renew_subscription/<int:shop_id>/', RenewSubscriptionView.as_view(), name='renew_subscription'),



    path('admin/assigncategory/<int:pk>/<int:stype>/', views.assigncategory, name='assigncategory'),
    path('admin/loadCategoryByShopIds/<int:id>/',views.loadCategoryByShopIds, name='loadCategoryByShopIds'),
  
    path('admin/save_assigned_category', views.save_assigned_category, name='save_assigned_category'),
    path('admin/fetch_assigned_category/', fetch_assigned_category, name='fetch_assigned_category'),
    
    
    path('admin/editshop/<int:pk>/', views.editshop, name='editshop'),
    path('admin/search/', views.search, name='search'),
    path('admin/loadCategoryId/', views.loadCategoryId, name='loadCategoryId'),
   
    path('admin/productmanagementlist', views.productmanagementlist, name='productmanagementlist'),
     
    path('admin/addproductmanagement', views.addproductmanagement, name='addproductmanagement'),
    path('editproduct/<int:pk>/', views.editproduct, name='editproduct'),
    path('admin/loadShopsByShopTypeId/<int:id>/', views.loadShopsByShopTypeId, name='loadShopsByShopTypeId'),
    path('admin/loadCategorysByShopTypeId/<int:id>', views.loadCategorysByShopTypeId, name='loadCategorysByShopTypeId'),


    path('product/<int:pk>/block/', views.block_product, name='block_product'),
    path('product/activate/<int:pk>/', views.activate_product, name='activate_product'),
   
    # path('search/', views.search_results, name='search_results'),




]