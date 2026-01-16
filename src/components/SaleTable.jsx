import axios from "axios";
import { useState } from "react";

export function SaleTable({ products, setProducts, fetchProducts, API }) {
  const [form, setForm] = useState({
    order: "",
    customer: "",
    product: "",
    amount: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    order: "",
    customer: "",
    product: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form, { withCredentials: true });
      await fetchProducts();
      // Reset the form
      setForm({
        order: "",
        customer: "",
        product: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error creating oder:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this oder?")) return;
    await axios.delete(`${API}/${id}`, { withCredentials: true });
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditForm({
      order: product.order,
      customer: product.customer,
      product: product.product,
      amount: product.amount,
    });
  };

  const handleEditSave = async (id) => {
    try {
      await axios.patch(`${API}/${id}`, editForm, { withCredentials: true });
      await fetchProducts();
      setEditId(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl bg-white border rounded-2xl p-5">
      <form onSubmit={handleSubmit} className="pb-3">
        <input
          onChange={handleChange}
          value={form.order}
          name="order"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Order"
        />
        <input
          onChange={handleChange}
          value={form.customer}
          name="customer"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Customer"
        />
        <input
          onChange={handleChange}
          value={form.product}
          name="product"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Product"
        />
        <input
          onChange={handleChange}
          value={form.amount}
          name="amount"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Amount"
        />
        <button
          type="submit"
          className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 mx-1 rounded-4xl"
        >
          Save new oder
        </button>
      </form>
      <table className="w-full border-separate">
        <thead>
          <tr className="text-center font-bold bg-gray-200">
            <th className="border rounded-tl-lg p-2">Order</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Amount</th>
            <th className="border rounded-tr-lg p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-white">
              {editId === product._id ? (
                <>
                  <td className="border p-2 ">
                    <input
                      value={editForm.order}
                      onChange={handleEditChange}
                      name="order"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.customer}
                      onChange={handleEditChange}
                      name="customer"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.product}
                      onChange={handleEditChange}
                      name="product"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.amount}
                      onChange={handleEditChange}
                      name="amount"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <button
                      onClick={() => handleEditSave(product._id)}
                      className="cursor-pointer bg-teal-400 hover:bg-teal-500 text-white px-2 rounded-xl"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white px-2 rounded-xl"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2 ">{product.order}</td>
                  <td className="border p-2 ">{product.customer}</td>
                  <td className="border p-2 ">{product.product}</td>
                  <td className="border p-2 ">{product.amount}</td>
                  <td className="border p-2 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="cursor-pointer bg-teal-400 hover:bg-teal-500 text-white px-5 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="cursor-pointer bg-rose-400 hover:bg-rose-500 text-white px-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
