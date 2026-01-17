import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Sparkles, Star, ExternalLink, ShoppingBag } from "lucide-react";
import { Badge } from "../components/ui/badge";

const recommendations = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    rating: 4.8,
    category: "Electronics",
    aiComment: "Based on your entertainment budget and interest in audio equipment",
    affordability: "well-affordable",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    rating: 4.6,
    category: "Health",
    aiComment: "Matches your health & fitness goals while staying within budget",
    affordability: "affordable",
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80",
    rating: 4.7,
    category: "Home",
    aiComment: "Could save $120/month on coffee shop visits",
    affordability: "affordable",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    rating: 4.5,
    category: "Electronics",
    aiComment: "Great value for your entertainment budget",
    affordability: "well-affordable",
  },
];

const getAffordabilityColor = (affordability: string) => {
  switch (affordability) {
    case "well-affordable":
      return "bg-success text-success-foreground";
    case "affordable":
      return "bg-primary text-primary-foreground";
    case "stretch":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function Recommendations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Recommendations</h1>
        <p className="text-muted-foreground mt-1">Smart product suggestions based on your budget and interests</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Your Budget Summary</h3>
              <p className="text-muted-foreground mb-4">
                You have <span className="font-semibold text-success">$1,600</span> remaining this month. 
                Based on your spending patterns and interests, we've found these personalized recommendations.
              </p>
              <Button>
                <Sparkles className="h-4 w-4 mr-2" />
                Refresh Recommendations
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {recommendations.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge className={getAffordabilityColor(product.affordability)}>
                      {product.affordability === "well-affordable" ? "Great Deal" : "Affordable"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{product.aiComment}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
