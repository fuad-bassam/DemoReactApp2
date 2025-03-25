import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardPage from "../(moduleDashboard)/DashboardPage";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import RegistrationPage from "../components/RegistrationPage";
import Layout from "../components/reusableComponent/Layout";
import CategoryCreateUpdatePage from "../(moduleProducts)/CategoryCreateUpdatePage";
import CategoryPage from "../(moduleProducts)/CategoryPage";
import ProductCreateUpdatePage from "../(moduleProducts)/ProductCreateUpdatePage";
import ProductPage from "../(moduleProducts)/ProductPage";
import VariantCreateUpdatePage from "../(moduleProducts)/VariantCreateUpdatePage";
import VariantPage from "../(moduleProducts)/VariantPage";


export enum NavRoutesEnum {
    Login = "/login",
    Register = "/register",
    Home = "/home",
    Dashboard = "/dashboard",
    Products = "/products",
    ProductCreateUpdate = "/product-create-update/:urlId?",
    Categories = "/categories",
    CategoryCreateUpdate = "/category-create-update/:urlId2?",
    Variants = "/variants",
    VariantCreateUpdate = "/variant-create-update/:urlName?",
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
