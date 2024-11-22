from django.db import models

from django.contrib.auth.models import AbstractUser
class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    email = models.EmailField(unique=True)


    # Add custom fields here, if needed

    def __str__(self):
        return self.username
    
class Address(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='addresses')
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=20)
    # adress
    # phone
    # landmark

    def __str__(self):
        return f"{self.user.username}'s Address - {self.street}, {self.city}, {self.state}, {self.zip_code}"

class Category(models.Model):
    name = models.CharField(max_length=50)
    shopType  = models.CharField(max_length=50)  
    sortOrder = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default='Active')
   

    def __str__(self):
        return self.name
        
class Shoptypename(models.Model):
    def __str__(self):
        return self.name

class ShopType(models.Model):
    # id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=200)
    Local = models.CharField(max_length=200)
    Description = models.CharField(max_length=500)
    Status = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
         return self .name 

 

class Varient(models.Model):
    name = models.CharField(max_length=200)
    status = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name       

class Shop(models.Model):
    Shopname = models.CharField(max_length=255,null=True)
    Shopnamelocal = models.CharField(max_length=255, blank=True, null=True)
    ShopCode = models.CharField(max_length=255, null=True, blank=False)
    ShopAddress = models.CharField(max_length=255,null=True)
    ExpiredDate = models.DateField(null=True,blank=True) 
    Currency = models.CharField(max_length=50,null=True,blank=True)
    Seoimages = models.ImageField(null=True, blank=True, upload_to="images/")
    SeoDescription = models.TextField(max_length=300, null=False, blank=False)
    PixelCode = models.TextField(max_length=500, null=False, blank=False)
    CityNames = models.TextField(max_length=255, null=False, blank=False)
    Theme = models.CharField(max_length=50,blank=True, null=True,)
    Banner1 = models.ImageField(null=True, blank=True, upload_to="images/")
    Banner2 = models.ImageField(null=True, blank=True, upload_to="images/")
    Banner3 = models.ImageField(null=True, blank=True, upload_to="images/")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
   
    Contactnumber = models.PositiveIntegerField(
       verbose_name='Contact Number (Username)', blank=True,  # You can set this to False if the field is required
        null=True, 
        
    )
    ShopLogo = models.ImageField(null=True, blank=True,
        upload_to='shop_logos',
        verbose_name='Shop Logo (494x86)',

        # Add the verbose name here
    )
    TotalItems = models.PositiveIntegerField(
        blank=False,     # You can set this to False if the field is required
        null=True, 
        verbose_name='Total Items (With Country Code)', 
      
    )
    shop_type = models.CharField(max_length=50)
    WhatsappNumber = models.PositiveIntegerField(  # Adjust the max length based on your requirements
        blank=False,     # You can set this to False if the field is required
        null=True, 
          
    )
    ShopURL = models.CharField(max_length=255,null=False, blank=False)
    SeoTitle = models.CharField(max_length=255,null=False, blank=False)
    is_active = models.BooleanField(default=True)
    category=models.ManyToManyField(Category)

    def __str__(self):
        return self.Shopname

class Currencyname(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Themename(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name



class Assignvariant(models.Model):
    Shoptypes = models.ForeignKey(ShopType, on_delete=models.CASCADE)
    Assignvariant = models.CharField(max_length=250)
    Categoryid = models.IntegerField()
    # Add the Category field or adjust it according to your model

    def __str__(self):
        return self.Assignvariant

class Categoryname(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name       
class AssignedCategory(models.Model):
    
    AssignedCategory = models.CharField(max_length=250)
    
    shop_id = models.IntegerField()

    def __str__(self):
        return self.AssignedCategory

class ProductManagement(models.Model):
    Productname = models.CharField(max_length=255, null=True)
    Local = models.CharField(max_length=255, null=True, blank=True,verbose_name="(Local)")
    ERPcode = models.CharField(max_length=255, blank=True, null=True)
    Category = models.ForeignKey(Category,on_delete=models.CASCADE)
    RegularPrice = models.DecimalField(max_digits=10, decimal_places=2,default=0.0)
    OfferPrice = models.DecimalField(max_digits=10, decimal_places=2,default=0.0)
    Availability = models.CharField(max_length=255, default='',blank=True, null=True)
    slot_1 = models.BooleanField(default=False, blank=True, null=True)
    slot_1 = models.BooleanField(default=False, blank=True, null=True )
    slot_2 = models.BooleanField(default=False, blank=True, null=True)
    slot_3 = models.BooleanField(default=False, blank=True, null=True)
    slot_4 = models.BooleanField(default=False, blank=True, null=True)
    every_time = models.BooleanField(default=False,blank=True, null=True)
    Description = models.TextField(max_length=300,blank=True, null=True)
    Sortorder = models.IntegerField(default=0,blank=True, null=True)
    Image = models.ImageField(null=True, blank=True, upload_to="product_image/")
    is_active = models.BooleanField(default=True,blank=True, null=True)
    Shop=models.ForeignKey(Shop,on_delete=models.CASCADE)
    warranty=models.CharField(max_length=50, help_text="eg:1 Year")
    
#   quantity_in_stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.Productname
    
class Specifications(models.Model):
    name=models.CharField(max_length=100)
    value=models.CharField(max_length=100)
    product=models.ForeignKey(ProductManagement,on_delete=models.CASCADE,related_name='specifications')

class Cart(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='cart')
    products = models.ManyToManyField(ProductManagement, through='CartItem')

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey('ProductManagement', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)