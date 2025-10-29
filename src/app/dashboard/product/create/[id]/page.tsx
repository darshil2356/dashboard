import ProductForm from "../components/ProductForm";

export default function EditPage({ params }) {
  return <ProductForm mode="edit" id={params.id} />;
}
