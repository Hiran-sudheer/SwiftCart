from django.contrib import admin
from .models import *



admin.site.register(ShopType)
admin.site.register(Category)
admin.site.register(Shop)
admin.site.register(Varient)
admin.site.register(Assignvariant)
admin.site.register(ProductManagement)

admin.site.register(CustomUser)



# admin.site.register(Item)
# Register your models here.
