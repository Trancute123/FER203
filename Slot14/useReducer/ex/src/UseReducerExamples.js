import Ex1Counter from "./examples/Ex1Counter";
import Ex2Form from "./examples/Ex2Form";
import Ex3ItemList from "./examples/Ex3ItemList";
import Ex4ItemListAdvanced from "./examples/Ex4ItemListAdvanced";
import Ex5MultiStepForm from "./examples/Ex5MultiStepForm.js";
import Ex6Cart from "./examples/Ex6Cart";

export default function UseReducerExamples() {
  return (
    <div style={{ padding: "20px" }}>
      <Ex1Counter />
      <Ex2Form />
      <Ex3ItemList />
      <Ex4ItemListAdvanced />
      <Ex5MultiStepForm />
      <Ex6Cart />
    </div>
  );
}
