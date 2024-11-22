from django.shortcuts import render
from django.http import Http404

from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, get_object_or_404, redirect
from .forms import ShopTypeForm,CategoryForm
from django.contrib import messages
from .models import ShopType,Category,Varient,Shoptypename,Shop,Currencyname,Assignvariant,AssignedCategory
from .models import ProductManagement
from .forms import VarientForm
from .forms import AssignvariantForm
from .forms import ShopForm
from .forms import ProductManagementForm
from django.urls import reverse
from django.core.paginator import Paginator
from .forms import AssignedCategoryForm
from django.http import JsonResponse, HttpResponseBadRequest
from django.db.models import Q
from django. utils import timezone
from django.db.models import F
import json
from django.shortcuts import get_list_or_404

from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt








from datetime import datetime, timedelta
from django.views.generic.base import View
from .models import Shop 








# Create your views here.
def index(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect("/")
            else:
                return render(
                    request, "login.htm", {"error_message": "Your account disable"}
                )
        else:
            return render(request, "login.htm", {"error_message": "Invalid Login"})
    return render(request, "login.htm")

def user_logout(request):
    logout(request)
    return redirect("mysite/login")
from django.contrib.auth.decorators import login_required, user_passes_test

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def admin(request):
    return render(request, "admin/dash.html")

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def dashboard(request):
    return render(request, "admin/dash.html")

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def shoptypelist(request):
    shoptypes = ShopType.objects.all() 
    return render(request, "admin/shoptype.html",{'shoptypes':shoptypes})

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def addshoptype(request):
    form = ShopTypeForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("/admin/shoptypelist")
    else:
        form = ShopTypeForm()
    context = {"form": form}
    return render(request, "admin/addshoptype.htm", context)

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def editshoptype(request, pk):
    current_record=ShopType.objects.get(id=pk)
    form = ShopTypeForm(request.POST or None,instance=current_record)
    if form.is_valid():
        form.save()
        messages.success(request,'successfully updated')
        return redirect("/admin/shoptypelist")
    else:
        return render(request,'admin/editshoptype.html',{'form':form})

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def block_shoptype(request, pk):
    shoptype = get_object_or_404(ShopType, id=pk)
    shoptype.is_active = False
    shoptype.save()
    return redirect("/admin/shoptypelist")

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def activate_shoptype(request, pk):
    shoptype = get_object_or_404(ShopType, id=pk)
    shoptype.is_active = True
    shoptype.save()
    return redirect("/admin/shoptypelist")



@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def search_shoptype(request):
    if request.method == 'GET':
        query= request.GET.get('q')

        submitbutton= request.GET.get('submit')

        if query is not None:
            lookups= Q(name__icontains=query) 

            shoptypes = ShopType.objects.filter(lookups).distinct()

            context={'shoptypes': shoptypes,
                     'submitbutton': submitbutton}

            return render(request, 'admin/shoptype.html', context)

        else:
            return render(request, 'admin/shoptype.html')

    else:
        return render(request, 'admin/shoptype.html')







@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def Categorylist(request):
  #  category = Category.objects.all()
   # select * from Category
   # category = Category.objects.annotate(shoptype=F('shopType__id')).all()

    categories = Category.objects.extra(
        select={'shoptypename': 'mysite_shoptype.name'},  # replace 'yourapp_shop.shop_name' with the actual field name in your Shop model
        tables=['mysite_shoptype'],  # replace 'yourapp_shop' with the actual app name and table name of your Shop model
        where=['mysite_category.shopType = mysite_shoptype.id']  # replace 'yourapp_category' and 'yourapp_shop' with the actual app name and table names of your models
    )
    for category in categories:
        print(category.__dict__)


    return render(request, "admin/Category.html",{'chacakk':categories})

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def addCategory(request):
    form = CategoryForm(request.POST or None)
    
    if form.is_valid():
        # form.save()
        if request.method == 'POST':
            cars = request.POST.get("cars")
            name = request.POST.get("name")
            sortOrder = request.POST.get("sortOrder")
            status = request.POST.get("status")

            # Now, you can use these variables to create a Category object
            p = Category(shopType=cars, name=name, sortOrder=sortOrder, status=status)
            p.save()
        return redirect("/admin/Categorylist")
    else:
        form = CategoryForm()
    context = {"form": form, 'shoptypeList': ShopType.objects.all()}
    return render(request, "admin/addCategory.html", context)

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def Shoptypeview(request):
    context = { 'shoptypenames': Shoptypename.objects.all() }
    return render(request, 'shoptypenames/admin/addCategory.html', context)

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def search_Category(request):
    if request.method == 'GET':
        query= request.GET.get('q')

        submitbutton= request.GET.get('submit')

        if query is not None:
            lookups= Q(name__icontains=query) 

            category = Category.objects.filter(lookups).distinct()

            context={'chacakk':category,
                     'submitbutton': submitbutton}

            return render(request, 'admin/Category.html', context)

        else:
            return render(request, 'admin/Category.html')

    else:
        return render(request, 'admin/Category.html')

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def editCategory(request, pk):
    current_record= Category.objects.get(id=pk)
    form = CategoryForm(request.POST or None,instance=current_record)
    if form.is_valid():
        form.save()
        messages.success(request,'successfully updated')
        return redirect("/admin/Categorylist")
    else:
      context = {"form": form, 'shoptypeList': ShopType.objects.all()}
      return render(request,'admin/editCategory.html', context)


@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def varientlist(request):
    search_query = request.GET.get('search','')
    if search_query:
        varients = Varient.objects.filter(name__icontains=search_query)
    else:
        varients = Varient.objects.all() 

    if request.method == 'POST':  # Check if the form has been submitted
        # print('sssssdd')
        form = VarientForm(request.POST) 
        print(form.is_valid())
         # Create a form instance with POST data
        if form.is_valid():
            form.save()  # Save the form data to the database
            return redirect("/admin/varientlist")  # Redirect to a success page or URL
    else:
        form = VarientForm() 
        
        context = {"form": form}
   # Use the correct model name (Variant) and variable name (variants)
    varients = Varient.objects.all() 
    return render(request, "admin/varient.html", {'varients': varients})

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def search(request):
    if request.method == 'GET':
        query= request.GET.get('q')

        submitbutton= request.GET.get('submit')

        if query is not None:
            lookups= Q(name__icontains=query) 

            varients= Varient.objects.filter(lookups).distinct()

            context={'varients': varients,
                     'submitbutton': submitbutton}

            return render(request, 'admin/varient.html', context)

        else:
            return render(request, 'admin/varient.html')

    else:
        return render(request, 'admin/varient.html')
 

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def editvarient(request):
    # Retrieve the variant based on the 'pk' parameter
    varientid=int(request.POST.get("varientid", "0"))
    print(varientid)
    current_record = get_object_or_404(Varient, id=varientid)

    # Check if the request method is POST
    if request.method == 'POST':
        form = VarientForm(request.POST, instance=current_record)
    if form.is_valid():
        
        form.save()
       
        return redirect("/admin/varientlist")
    else:
       print(form.errors)
    return render(request, 'admin/varient.html', {'form': form, 'current_record': current_record})











    
@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def addvarient(request):
    
    if request.method == 'POST':  # Check if the form has been submitted
        form = VarientForm(request.POST)  # Create a form instance with POST data
        if form.is_valid():
            form.save()  # Save the form data to the database
            return redirect("/admin/varientlist")  # Redirect to a success page or URL
    else:
        form = VarientForm()  # Create a new form instance

    context = {"form": form}
    
    return render(request, "admin/addvarient.html", context)

    return render(request, "admin/varient_search.html", context)


# def addassignvarient(request):
#     shoptypes = ShopType.objects.all()
#     category = Category.objects.all() 
    
   
#     return render(request, 'assignvariant.html', {'shoptypes': shoptypes, 'categories': categories})

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def loadCategoryByShopId(request,id):
    category = Category.objects.filter(shopType=id).order_by('name')
    data = [{'id': item.id, 'name': item.name} for item in category]
    return JsonResponse({'data': data})
  

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def loadCategoryId(request):
    varient = Varient.objects.all()
    data = [{'id': list.id, 'name': list.name} for list in varient] 
    return JsonResponse({'data':data})
  
@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def fetch_assigned_variants(request):
    category_id = request.GET.get('Categoryid')
    shoptypes_id = request.GET.get('Shoptypes_id')
    assigned_variants = Assignvariant.objects.filter(Categoryid=category_id, Shoptypes_id=shoptypes_id).first()
   
    
    comma_seprated_data=assigned_variants.Assignvariant;
    assigned_varientList = comma_seprated_data.split(',')
    

    assigned_variants_deatils = Varient.objects.filter(
    id__in=assigned_varientList
    )
 
    #data = [{'id': assigned_variants.id, 'name': assigned_variants}]



    data = [{'id': variant.id, 'name': variant.name} for variant in assigned_variants_deatils]
    return JsonResponse({'data': data})


@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def save_assigned_variants(request):
    #print(request.POST['shoptype'])
    #print(request.POST['product_code'])
    #currentrecord= get_object_or_404(Assignvariant, Shoptypes_id=request.POST['Shoptypes'], Category=request.POST['Categoryid']) 
    try:
     currentrecord = get_object_or_404(Assignvariant, Shoptypes_id=request.POST['Shoptypes'], Categoryid=request.POST['Categoryid'])

     form = AssignvariantForm(request.POST or None,instance=currentrecord)
    except Http404:
     form = AssignvariantForm(request.POST) 

    if form.is_valid():
     form.save()  # Save the form data to the database
          
    return JsonResponse({'success': True})
  

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def assignvarientlist(request):


    selectedVarient = [...]  # Populate 'selectedVarient' with your data

    shoptype = ShopType.objects.all()
    category = Category.objects.all()
    varients = Varient.objects.all()

    context = {
        'selectedVarient': selectedVarient,
        'shoptypes': shoptype,
        'categorys': category,
        'varients': varients,
    }

    return render(request, 'admin/assignvarient.html', context)






@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def addshop(request):
    if request.method == 'POST':
        form = ShopForm(request.POST, request.FILES)

        if form.is_valid():
          
            print (form.cleaned_data['shop_type'].id)
            #shopType = form.cleaned_data['shopType']
            #group = ShopType.objects.create(pk=shopType)
            # Save the new shop to the database
            
            obj = form.save(commit=False)
            obj.shop_type = form.cleaned_data['shop_type'].id
            obj.save()
                # Redirect to the Django admin change list page for 'Shop'

        
        return redirect("/admin/shoplist")
    else:
        form = ShopForm()

    context = {"form": form}
    return render(request, 'admin/addshop.html', context)

    


# def shoplist(request):
#     # Fetch a list of all shops from the database
#     shoptype = ShopType.objects.all()
#     lists = Shop.objects.all()
     
#     paginator = Paginator(lists, per_page=10)  # Set the number of items per page

#     page_number = request.GET.get('page')
#     page_obj = paginator.get_page(page_number)
   
    
   

#     current_date = timezone.now().date()
#     for shop_instance in lists:
#         shop_instance.days_left = (shop_instance.ExpiredDate - current_date).days

#         context = {
#         'page_obj': page_obj,  # Include the page_obj in the context
#         'shops': lists, 
#         'shoptypes': shoptype,
#         # Include the shops queryset in the context
#     }
   
#     return render(request, "admin/shop.html", context)
@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def shoplist(request):
    # Fetch a list of all shops from the database
    shoptype = ShopType.objects.all()
    lists = Shop.objects.all()
     
    paginator = Paginator(lists, per_page=10)  # Set the number of items per page

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
   
    current_date = timezone.now().date()

    # Define context outside the loop
    context = {
        'shops': lists, 
        'shoptypes': shoptype,
    }

    for shop_instance in lists:
        shop_instance.days_left = (shop_instance.ExpiredDate - current_date).days

    return render(request, "admin/shop.html", context)



class RenewSubscriptionView(View):
    
    def get(self, request, *args, **kwargs):
        shop_id = self.kwargs.get('shop_id')
        print("Shop ID (GET):", shop_id)
       

    def post(self, request, *args, **kwargs):
        shop_id = self.kwargs.get('shop_id')
        print("Shop ID (POST):", shop_id)

        # Assuming you have a form for the renewal with fields 'expired_date' and 'total_items'
        expired_date = request.POST.get('expired_date')
        total_items = request.POST.get('total_items')

        # Your logic to update the expiration date based on the selected renewal period
        # This is a simple example; you may need to adjust it based on your requirements
        days_in_month = 30
        total_days = int(expired_date) * days_in_month

        # Retrieve the shop from the database based on the shop_id
        shop = Shop.objects.get(pk=shop_id)

        new_expired_date = datetime.now() + timedelta(days=total_days)
        shop.ExpiredDate = new_expired_date
        shop.TotalItems = total_items
        shop.save()

       
        return redirect("/admin/shoplist")










    
@user_passes_test(lambda u: u.is_superuser or u.is_staff)    
def editshop(request, pk):
    current_record = Shop.objects.get(id=pk)
    current_active_status = current_record.is_active

    form = ShopForm(request.POST or None, instance=current_record)

    if form.is_valid():
        # Exclude is_active from form.cleaned_data
        print (form.cleaned_data['shop_type'].id)
        form.cleaned_data.pop('is_active', None)

        obj = form.save(commit=False)
        obj.shop_type = form.cleaned_data['shop_type'].id
        obj.save()

        # Set the original active status
        current_record.is_active = current_active_status
        current_record.save()

        messages.success(request, 'Successfully updated')
        return redirect("/admin/shoplist")
    else:
        return render(request, 'admin/editshop.html', {'form': form})


@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def block_shop(request, pk):
    shop = get_object_or_404(Shop, id=pk)
    shop.is_active = False
    shop.save()
    return redirect("/admin/shoplist")
@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def activate_shop(request, pk):
    shop = get_object_or_404(Shop, id=pk)
    shop.is_active = True
    shop.save()
    return redirect("/admin/shoplist")

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def search_shop(request):
    if request.method == 'GET':
        query= request.GET.get('q')

        submitbutton= request.GET.get('submit')

        if query is not None:
            lookups= Q(Shopname__icontains=query) 

            lists= Shop.objects.filter(lookups).distinct()

            context={'shops': lists,
                     'submitbutton': submitbutton}

            return render(request, 'admin/shop.html', context)

        else:
            return render(request, 'admin/shop.html')

    else:
        return render(request, 'admin/shop.html')



@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def Currencyview(request):
    context = { 'Currency':Currencyname.objects.all()}
    return render(request, 'Currencynames/admin/addShop.html', context)

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def Themename(request):
    context = { 'Theme':Themename.objects.all()}
    return render(request, 'Themenames/admin/addShop.html', context)    



@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def assigncategory(request,pk,stype):
    newrec=Shop.objects.get(id=pk)
    shoptype = ShopType.objects.all()
    category = Category.objects.filter( shopType=stype).order_by('name')
   

    context = {
   
        'shoptypes': shoptype,
        'categorys': category,
        'newrec':newrec,
    }
    return render(request, "admin/assigncategory.html", context)


@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def save_assigned_category(request):

    # print(request.POST['shop_id'])
    print(request.POST['AssignedCategory'])

    try:
        currentrecord = get_object_or_404(AssignedCategory, shop_id=request.POST['shop_id'], AssignedCategory=request.POST['AssignedCategory'])
        form = AssignedCategoryForm(request.POST or None, instance=currentrecord)
    except Http404:
        form = AssignedCategoryForm(request.POST)

    if form.is_valid():
        form.save()  # Save the form data to the database

    return JsonResponse({'success': True})
    




@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def fetch_assigned_category(request):
    shop_id = request.GET.get('shop_id')
    assigned_category = AssignedCategory.objects.filter(shop_id=shop_id).first()
    
    if assigned_category:
        comma_separated_data = assigned_category.AssignedCategory
        assigned_category_list = comma_separated_data.split(',')
        assigned_category_details = Category.objects.filter(id__in=assigned_category_list)
        data = [{'id': category.id, 'name': category.name} for category in assigned_category_details]
    else:
        data = []

    return JsonResponse({'data': data})








@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def loadCategoryByShopIds(request, id):
 
    category = Category.objects.filter(shopType=id).order_by('name')
    data = [{'id': item.id, 'name': item.name} for item in category]
    return JsonResponse({'data': data})








@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def productmanagementlist(request):
    products = ProductManagement.objects.all()
    shoptype = ShopType.objects.all()
    shops = Shop.objects.all()
    category = Category.objects.all()
    context = {
      
        'shops': shops, 
        'shoptypes': shoptype,
        'chacakk':category,
        'products': products,
    }
    return render(request, "admin/productmanagement.html", context)

@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def addproductmanagement(request):
    if request.method == 'POST':
         
        form = ProductManagementForm(request.POST, request.FILES)
        print(form.is_valid())
        if form.is_valid():
           
            form.save()
          
            return redirect("/admin/productmanagementlist")
    else:
        form = ProductManagementForm()

    context = {"form": form}
    return render(request, 'admin/addproductmanagement.html', context)



@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def editproduct(request, pk):
    current_record=ProductManagement.objects.get(id=pk)
    form = ProductManagementForm(request.POST or None,instance=current_record)
    if form.is_valid():
        form.save()
        messages.success(request,'successfully updated')
        return redirect("/admin/productmanagementlist")
    else:
        return render(request,'admin/editproduct.html',{'form':form})


@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def block_product(request, pk):
    product = get_object_or_404(ProductManagement, id=pk)
    product.is_active = False
    product.save()
    return redirect("/admin/productmanagementlist")
@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def activate_product(request, pk):
    product = get_object_or_404(ProductManagement, id=pk)
    product.is_active = True
    product.save()
    return redirect("/admin/productmanagementlist")






@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def loadShopsByShopTypeId(request,id):
    shops = Shop.objects.filter(shopType=id).order_by('name')
    data = [{'id': item.id, 'name': item.name} for item in shops]
    return JsonResponse({'data': data})
@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def loadShopsByShopTypeId(request, id):
    try:
        # Query the database for shops of the selected shop type and order them by 'Shopname'
        shops = Shop.objects.filter(shop_type=id).order_by('Shopname')

        # Create a list of shop data
        data = [{'id': shop.id, 'name': shop.Shopname} for shop in shops]

        # Return the shop data as JSON
        return JsonResponse({'data': data})
    except Exception as e:
        return JsonResponse({'error': str(e)})


  
@user_passes_test(lambda u: u.is_superuser or u.is_staff)
def loadCategorysByShopTypeId(request,id):
    category = Category.objects.filter(shopType=id).order_by('name')
    data = [{'id': item.id, 'name': item.name} for item in category]
    return JsonResponse({'data': data})


    

# def search_results(request):
#     query = request.GET.get('q', '')
    
#     # Perform your search query using the 'query' variable
#     results = search.objects.filter( search__icontains=query)

#     context = {
#         'query': query,
#         'results': results,
#     }

#     return render(request, 'search_results.html', context)










