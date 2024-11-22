from .models import ShopType
from .models import Category
from django import forms
from .models import Varient
from .models import Assignvariant
from .models import Shop,Currencyname,Themename,Shoptypename,ProductManagement
from .models import AssignedCategory
from django.utils.safestring import mark_safe









STATUS_CHOICES= [
    ('A', 'Active'),
    ('B', 'Block'),
    ]

class ShopTypeForm(forms.ModelForm):
    name = forms.CharField(label='Shop Type Name',widget=forms.TextInput(attrs={'class': 'form-control','placeholder': 'Shop Type Name ','style':'width:100%;'}))
    Local = forms.CharField(label='Shop Type Name Local',widget=forms.TextInput(attrs={'class': 'form-control',  'placeholder': 'Shop Type Name Local','style':'width:100%;'}))
    Description = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control','placeholder': 'Description','style':'width:330px;'}))
    
    class Meta:
        model = ShopType
        fields = ['name', 'Local', 'Description']

class CategoryForm(forms.ModelForm):
    name = forms.CharField( label='Category Name',widget=forms.TextInput(attrs={'class': 'form-control','placeholder':'Category Name','style':'width:330px;'}))
    # ShopType = forms.CharField(widget=forms.Select(attrs={'class': 'form-control','style': 'width: 355px;'}))
    sortOrder = forms.IntegerField(label='Sort Order',widget=forms.NumberInput(attrs={'class': 'form-control','autocomplete':'off','data-parsley-trigger':'keyup','data-parsley-type':'number','placeholder':'Sort Order','fdprocessedid':'izpzt','style':'width:330px;'}))
    status = forms.CharField(widget=forms.Select(choices=STATUS_CHOICES, attrs={'class': 'form-control','style':'width:330px;'}))
  
    class Meta:
        model = Category
        fields = ['name', 'sortOrder','status']




class VarientForm(forms.ModelForm):
    class Meta:
        model = Varient
        fields = ['name','status']


class AssignvariantForm(forms.ModelForm):
    
    class Meta:
        model = Assignvariant
        fields = ['Shoptypes','Assignvariant','Categoryid']

class ShopForm(forms.ModelForm):
    Shopname = forms.CharField(
        label='Shop Name', 
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'autocomplete': 'off',
            'placeholder': 'Shop Name',
            'style':'width:100%;margin-left: -14px;' 
        }),
        error_messages={
            'required': 'Shop Name is required.',
            'invalid': 'Symbol not allowed here.',
        },
    )


    Shopnamelocal = forms.CharField(
        label=('Shop Name Local'),
        widget=forms.TextInput(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Shop Name Local',
            'style':'width:100%;'
        }),
        required=False,  
    )

    ShopCode = forms.CharField(
        
        label='Shop Code',
        widget=forms.TextInput(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Shop Code',
            'style':'width:100%;margin-left: 4px;'
        }),
        required=False,  # Set to True if this field is required
    )
    

    ShopAddress = forms.CharField(
        
        label='Shop Address',
        widget=forms.TextInput(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Shop Address',
            'style':'width:100%;margin-left: -13px;'
        }),
        required=False,  # Set to True if this field is required
    )

    Currency = forms.ModelChoiceField(
        label='Currency',
        empty_label='-Select-',
        queryset=Currencyname.objects.all(),
        widget=forms.Select(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Currency',
            'style': 'width: 100%;'
        }),
            
        required=False, 
    )
    

    
   





    SeoDescription= forms.CharField(
        label='SeoDescription',
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            
            'rows': 2,
            'cols': 30,
            'style': 'height: 56px; width: 1076px;',
        }),
        error_messages={
            'required': 'This field is required.',
        },
        validators=[
            # You can add additional validators here if needed
        ]
    )

    PixelCode = forms.CharField(
        label='PixelCode',
        required=False,  # Set to True if you want it to be required
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 6,
            'cols': 50,
        }),
    )

    CityNames= forms.CharField(
        label='City Names',
        required=True,  # Set to True if you want it to be required
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 4,
            'cols': 50,
            'data-parsley-pattern-message': 'This is not a valid city name',
            'data-parsley-trigger': 'keyup',
        }),
    )
    Contactnumber = forms.IntegerField(
        label='Contact Number(Username)',
        widget=forms.NumberInput(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid contact number',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'contact_no',
            'required': True,
            'placeholder': 'Contact Number',
            'fdprocessedid': 'wmac16',
            'style': 'width: 100%;margin-left: 4px'
        }),
    )
    
    ShopLogo = forms.ImageField(
        label='Shop Logo(494x86)',
        required=False,
        widget=forms.ClearableFileInput(attrs={'class': 'form-control', 'style': 'width:100%;margin-left:4px'}),

    )



     
    TotalItems = forms.IntegerField(
        label='Total Items',
        widget=forms.NumberInput(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid contact number',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'contact_no',
            'required': True,
            'placeholder': 'Total Items',
            'fdprocessedid': 'wmac16',
            'suffix': 'Nos',
            'style': 'width: 100%;margin-left: -13px'
          
            
        }),
    )
    Theme = forms.ModelChoiceField(
        label='Theme',
        empty_label='-Select-',
        queryset=Themename.objects.all(),
        widget=forms.Select(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Theme',
            'style': 'width: 100%;margin-left:3.5px'
        }),
            
        required=False, 
    )
    WhatsappNumber= forms.IntegerField(
        label='Whatsapp Number(With Country Code)',
        widget=forms.NumberInput(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid contact number',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'contact_no',
            'required': True,
            'placeholder': 'Whatsapp Number(91)',
            'fdprocessedid': 'wmac16',
            'style': 'width: 100%;margin-left: -13px'
        }),
    )

    ShopURL = forms.CharField(
        label='Shop URL',
        widget=forms.TextInput(attrs={
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Shop URL',
            'style':'width:100%;margin-left: -13px'
        }),
        required=False,  
    )
    Seoimages = forms.ImageField(
        required=False,
        widget=forms.ClearableFileInput(attrs={'class': 'form-control', 'style': 'width:100%;'}),

    )







    SeoTitle= forms.CharField(
        label='Seo Title',
        widget=forms.TextInput(attrs={
            
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Shop Title',
            'style':'width:100%;'
        }),
        required=False,  
    )

    shop_type= forms.ModelChoiceField(
        label='Shop Type',
        queryset=ShopType.objects.all(),
        empty_label='-Select-',
        widget=forms.Select(attrs={'class': 'form-control', 'style': 'width: 100%;'}),
        required=False,
        to_field_name = 'id'
        # Set to True if the field is required
    )



    Banner1 = forms.ImageField(
        required=False,
        widget=forms.ClearableFileInput(attrs={'class': 'form-control', 'style': 'width:100%;margin-left: -14px;'}),label=mark_safe("*(<strong>Note:</strong> Banner image is needed only for hero theme ) <br>Banner1"))

    
    Banner2 = forms.ImageField(
        required=False,
        # help_text='(Note: Banner image is needed only for hero theme)',
         widget=forms.ClearableFileInput(attrs={'class': 'form-control', 'style': 'width:100%;margin-left: -14px;'}),

    )
    Banner3 = forms.ImageField(
        required=False,
        widget=forms.ClearableFileInput(attrs={'class': 'form-control', 'style': 'width:100%;margin-left: -14px;'}),

    )






    class Meta:
        model = Shop
        fields = '__all__'
        widgets = {
            'ExpiredDate': forms.DateInput(attrs={'type': 'date', 
            'autocomplete': 'off',
            'data-parsley-pattern-message': 'This is not a valid name',
            'data-parsley-trigger': 'keyup',
            'class': 'form-control',
            'id': 'sort_order',
            'placeholder': 'Shop Code',
            'style': 'width: 100%;margin-left:4px'}),
        }
class AssignedCategoryForm(forms.ModelForm):
 

    class Meta:
        model = AssignedCategory
        fields = ['shop_id','AssignedCategory']

         
        
class ProductManagementForm(forms.ModelForm):
    Productname = forms.CharField(
        label='Product Name',
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'id': 'product',
            'autocomplete': 'off',
            'required': True,
            'placeholder': 'Product Name',
            'fdprocessedid': '6m1bj',
            'style': 'width: 510px;'
        })
    )
  
    Local= forms.CharField(
        label='Product Name (Local)',
        
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'id': 'product',
            'autocomplete': 'off',
            'required': True,
            'placeholder': 'Product Name (Local)',
            'fdprocessedid': '6m1bj',
            'style': 'width: 510px;'
        })
    )


    ERPcode= forms.CharField(
        label='ERP Code',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'id': 'product',
            'autocomplete': 'off',
            'required': True,
            'placeholder': 'ERP Code',
            'fdprocessedid': '6m1bj',
            'style': 'width: 510px;'
        })
    )


    Category = forms.ModelChoiceField(
        label='Category',
        queryset = Category.objects.all(),
        empty_label='-Select-',
        widget=forms.Select(attrs={'class': 'form-control', 'style': 'width: 510px;'}),
        required=False, 
      
    ) 
      
    RegularPrice = forms.DecimalField(
        label='Regular Price',
        widget=forms.NumberInput(attrs={
            'type': 'number',
            'step': '0.01',
            'id': 'regular_price',
            'name': 'regular_price',
            'data-parsley-trigger': 'keyup',
            'autocomplete': 'off',
            'required': True,
            'class': 'form-control',
            'value': '00.00',
            'placeholder': 'Regular Price',
            'fdprocessedid': 'q47fya',
        }),
    )


    OfferPrice = forms.DecimalField(
        label='Offer Price',
        widget=forms.NumberInput(attrs={
            'type': 'number',
            'step': '0.01',
            'id': 'regular_price',
            'name': 'regular_price',
            'data-parsley-trigger': 'keyup',
            'autocomplete': 'off',
            'required': True,
            'class': 'form-control',
            'value': '00.00',
            'placeholder': 'Regular Price',
            'fdprocessedid': 'q47fya'
        }),
    )
    AVAILABILITY_CHOICES = [
        ('slot_1', '08:00 AM - 11:00 AM'),
        ('slot_2', '11:00 AM - 02:00 PM'),
        ('slot_3', '02:00 PM - 06:00 PM'),
        ('slot_4', '06:00 PM - 12:00 AM'),
        ('every_time', 'Every time'),
    ]
    Availability= forms.MultipleChoiceField(
            label= 'Availability',
            widget=forms.CheckboxSelectMultiple,
            choices=AVAILABILITY_CHOICES
        )
        

    Description = forms.CharField(
        label='Description',
        required=False,  # Set to True if you want it to be required
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'style': 'height: 135px'
        }),
    )
       
    Sortorder = forms.IntegerField(
        label = 'Sort Order',    
        required=True,
        widget=forms.TextInput(
            attrs={
                'autocomplete': 'off',
                'class': 'form-control',
                'id': 'price',
                'placeholder': 'Sort Order',
                'data-parsley-trigger': 'keyup',
                'data-parsley-type': 'number',
                'value': '0',  # You can set a default value here
            }
        )
    )
     
    Image = forms.ImageField(
        label='Image (237X140 px)',
        required=False,
        widget=forms.ClearableFileInput(attrs={'class': 'form-control', 'style': 'width:510px;'}),
    )


    class Meta:
        model = ProductManagement
        fields = '__all__'
   