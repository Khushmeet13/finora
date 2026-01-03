import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Filter, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const products = [
  {
    id: 1,
    name: "Premium Laptop Backpack",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    rating: 4.5,
    category: "Accessories",
  },
  {
    id: 2,
    name: "Wireless Gaming Mouse",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80",
    rating: 4.7,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    rating: 4.8,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Yoga Mat Pro",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&q=80",
    rating: 4.6,
    category: "Fitness",
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    rating: 4.4,
    category: "Accessories",
  },
  {
    id: 6,
    name: "LED Desk Lamp",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
    rating: 4.5,
    category: "Home",
  },
];

export default function SearchProducts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Product Search</h1>
        <p className="text-muted-foreground mt-1">Find products within your budget</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="any">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="over-200">Over $200</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square w-full overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-primary">${product.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
              <Button className="w-full mt-4">Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
