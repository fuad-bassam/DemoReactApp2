import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../../Component/APIPage/Common/LoginPage";
import RegistrationPage from "../../Component/APIPage/Common/RegistrationPage";
import DashboardPage from "../../Component/APIPage/Dashboard/DashboardPage";
import ProductPage from "../../Component/APIPage/Product/Product/ProductPage";
import VariantPage from "../../Component/APIPage/Product/Variant/VariantPage";
import Layout from "../../Component/CommonComponent/Layout";
import ProductCreateUpdatePage from "../../Component/APIPage/Product/Product/ProductCreateUpdatePage";
import HomePage from "../../Component/APIPage/Common/HomePage";
import VariantCreateUpdatePage from "../../Component/APIPage/Product/Variant/VariantCreateUpdatePage";
import CategoryCreateUpdatePage from "../../Component/APIPage/Product/Category/CategoryCreateUpdatePage";
import CategoryPage from "../../Component/APIPage/Product/Category/CategoryPage";

export enum NavRoutesEnum {
    Login = "/login",
    Register = "/register",
    Home = "/home",
    Dashboard = "/dashboard",
    Products = "/products",
    ProductCreateUpdate = "/product-create-update/:urlId?",
    Categories = "/categories",
    CategoryCreateUpdate = "/category-create-update",
    Variants = "/variants",
    VariantCreateUpdate = "/variant-create-update",
}

export const NavRoutes = createBrowserRouter([
    {
        path: NavRoutesEnum.Login,
        element: <LoginPage />,
    },
    {
        path: NavRoutesEnum.Register,
        element: <RegistrationPage />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: NavRoutesEnum.Home, element: <HomePage /> },
            { path: NavRoutesEnum.Dashboard, element: <DashboardPage /> },
            { path: NavRoutesEnum.Products, element: <ProductPage /> },
            { path: NavRoutesEnum.ProductCreateUpdate, element: <ProductCreateUpdatePage /> },
            { path: NavRoutesEnum.Categories, element: <CategoryPage /> },
            { path: NavRoutesEnum.CategoryCreateUpdate, element: <CategoryCreateUpdatePage /> },
            { path: NavRoutesEnum.Variants, element: <VariantPage /> },
            { path: NavRoutesEnum.VariantCreateUpdate, element: <VariantCreateUpdatePage /> },
        ],
    },
    {
        path: "*",
        element: <Navigate to={NavRoutesEnum.Login} />,
    },
]);
