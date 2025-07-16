from django.db import models

class Customer(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=150)
    address = models.JSONField(null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class ProductCategory(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(null=True)
    remaining_amount = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    categories = models.ManyToManyField("shop.ProductCategory")

    def __str__(self):
        return self.name
    
class Order(models.Model):
    customer = models.ForeignKey("shop.Customer", on_delete=models.PROTECT)
    order_date = models.DateField(auto_now_add=True)
    remark = models.CharField(null=True)
    products = models.ManyToManyField("shop.Product", through="shop.OrderItem")

class OrderItem(models.Model):
    order = models.ForeignKey("shop.Order", on_delete=models.PROTECT)
    product = models.ForeignKey("shop.Product", on_delete=models.PROTECT)
    amount = models.IntegerField(default=1)

class Cart(models.Model):
    customer = models.ForeignKey("shop.Order", on_delete=models.PROTECT)
    create_date = models.DateTimeField(auto_now_add=True)
    expired_in = models.IntegerField(default=60)

class CartItem(models.Model):
    cart = models.ForeignKey("shop.Cart", on_delete=models.PROTECT)
    product = models.ForeignKey("shop.Product", on_delete=models.PROTECT)
    amount = models.IntegerField(default=1)

class Payment(models.Model):
    order = models.OneToOneField("shop.Order", on_delete=models.PROTECT)
    payment_date = models.DateField(auto_now_add=True)
    remark = models.CharField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class PaymentItem(models.Model):
    payment = models.ForeignKey("shop.Payment", on_delete=models.PROTECT)
    order_item = models.OneToOneField("shop.OrderItem", on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class PaymentMethod(models.Model):
    class pmChoices(models.TextChoices):
            QR = "QR"
            CREDIT = "CREDIT"
    payment = models.ForeignKey("shop.Payment", on_delete=models.PROTECT)
    method = models.CharField(choices=pmChoices)
    price = models.DecimalField(max_digits=10, decimal_places=2)