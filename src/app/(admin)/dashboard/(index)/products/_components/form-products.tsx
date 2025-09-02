"use client";

import type { Brand, Category, Location } from "@prisma/client";
import { AlertCircleIcon, SquareChevronLeft } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getImageUrl } from "@/lib/supabase";
import type { ActionResult } from "@/type";
import { getBrands } from "../../brands/lib/data";
import { getCategories } from "../../categories/lib/data";
import { getLocations } from "../../locations/lib/data";
import { postProduct, updateProduct } from "../lib/actions";
import UploadImages from "./upload-images";

const initialState: ActionResult = {
  error: "",
};

interface FormProductsProps {
  type?: "ADD" | "EDIT";
  data?: any | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="p-5">
      {pending ? "Loading" : "Save Product"}
    </Button>
  );
}

export default function FormProducts({ data, type }: FormProductsProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [_selectedCategory, setSelectedCategory] = useState<string>("");
  const [_selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("available");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Update selected values when data changes
  useEffect(() => {
    if (data && type === "EDIT") {
      setSelectedCategory(data.category_id?.toString() || "");
      setSelectedBrand(data.brand_id?.toString() || "");
      setSelectedLocation(data.location_id?.toString() || "");
      setSelectedStatus(data.stock || "available");
    }
  }, [data, type]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, brandsData, locationsData] = await Promise.all([
          getCategories(),
          getBrands(),
          getLocations(),
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);
        setLocations(locationsData);
      } catch (_error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateProductWithId = (_: unknown, formData: FormData) => {
    return updateProduct(_, formData, data?.id);
  };

  const [state, formAction] = useActionState(
    type === "ADD" ? postProduct : updateProductWithId,
    initialState
  );

  const isSchemaError =
    state?.error &&
    (state.error.includes("required") ||
      state.error.includes("min") ||
      state.error.includes("max") ||
      state.error.includes("invalid"));

  if (loading || (type === "EDIT" && !data)) {
    return (
      <div className="flex justify-center w-full my-5">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <div className="mb-6">
            <Link href="/dashboard/products" className="flex items-center w-fit">
              <SquareChevronLeft className="mr-2 h-5 w-5" />
              <span className="text-xl font-semibold">Back to Products</span>
            </Link>
          </div>
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">
                    {type === "EDIT" ? "Loading product data..." : "Loading form data..."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full my-5">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="mb-6">
          <Link href="/dashboard/products" className="flex items-center w-fit">
            <SquareChevronLeft className="mr-2 h-5 w-5" />
            <span className="text-xl font-semibold">Back to Products</span>
          </Link>
        </div>

        <form action={formAction}>
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Basic Information</CardTitle>
              <CardDescription>Enter the basic details for this product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  defaultValue={data?.name || ""}
                  required
                  className="py-5"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 0 && value.length < 4) {
                      setNameError("Name must be at least 4 characters long");
                    } else {
                      setNameError("");
                    }
                  }}
                />
                {nameError && <p className="text-sm text-red-600">{nameError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  defaultValue={data?.description || ""}
                  required
                  className="py-5"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 0 && value.length < 10) {
                      setDescriptionError("Description must be at least 10 characters long");
                    } else {
                      setDescriptionError("");
                    }
                  }}
                />
                {descriptionError && <p className="text-sm text-red-600">{descriptionError}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Organization Card */}
          <Card className="my-5">
            <CardHeader>
              <CardTitle className="text-xl">Product Organization</CardTitle>
              <CardDescription>
                Organize this product with categories, brands, and locations.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category_id" defaultValue={data?.category_id?.toString()} required>
                    <SelectTrigger className="py-5">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select name="brand_id" defaultValue={data?.brand_id?.toString()} required>
                    <SelectTrigger className="py-5">
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand: Brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    name="location_id"
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                    required
                  >
                    <SelectTrigger className="py-5">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location: Location) => (
                        <SelectItem key={location.id} value={location.id.toString()}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Card */}
          <Card className="my-5">
            <CardHeader>
              <CardTitle className="text-xl">Inventory</CardTitle>
              <CardDescription>Set the inventory status for this product.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  required
                >
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Media Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Product Media</CardTitle>
              <CardDescription>Upload images for this product.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 py-6">
              <UploadImages
                name="images"
                existingImages={
                  data?.images?.map((image: string) => getImageUrl(image, "product")) || []
                }
                required={type === "ADD"}
              />
            </CardContent>
          </Card>

          {/* Action Card */}
          <div>
            {state?.error && !isSchemaError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Product Operation Failed</AlertTitle>
                <AlertDescription>
                  <p>There was an error processing your product request.</p>
                  <ul className="list-inside list-disc text-sm mt-2">
                    <li>Check all required fields</li>
                    <li>Ensure the image is properly uploaded</li>
                    <li>Verify the product doesn't already exist</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            {state?.error && isSchemaError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state?.error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex gap-3 my-10">
            <Button type="button" variant="outline" className="p-5">
              Discard
            </Button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
