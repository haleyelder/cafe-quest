export default function About() {
  return (
    <>
    <div className="description ">
      <p>
        {" "}
        Cafe Quest is a visual listing of restaurants, coffee shops, and dessert
        spots recommended to me, or I came across, around the Portland, OR metro
        area.
      </p>
      <p>
        <strong> Key </strong>
        <ul>
          <li>
            The list can be sorted by clicking to toggle the top four buttons in
            ascending or descending order, and a reset button to the original
            list.
          </li>
          <li>
            {" "}
            Neighborhoods are SE (Southeast), N (North), DT (Downtown), and
            Other (mostly Beaverton so far){" "}
          </li>
          <li>
            clicking an item's "directions" will open Google Maps and the
            location filled in for you
          </li>
        </ul>
      </p>
    </div>
    </>
  );
}
