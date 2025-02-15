import "./Spinner.css";
const Spinner = () => {
  return (
    <>
      <div className="blur">
        <div class="loader-container">
          <div class="loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Spinner;
