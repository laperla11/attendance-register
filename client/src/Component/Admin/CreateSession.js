import React from "react";

export default function CreateSession(props) {
const { handleSubmit, handleChange, name, city, latitude, longitude, date, session } = props;
return (
<div className="createSession">
<div className="new_session">
<h3 className="text-center mb-1">Create a new Session</h3>
</div>
<form className="form-group ml-3" onSubmit={e => handleSubmit(e)}>
<div>
<div >
<label for ="eFormControlInput1">Date</label>
<input
type="text"
value={date}
name="date"
placeholder="DD/MM/YYYY"
className="input form-control"
onChange={e => handleChange(e)}
/>
</div>
<div className="">
<label for="eFormControlInput1">Name</label>
<input
type="text"
value={name}
name="name"
placeholder="ReactJS"
className="input form-control"
onChange={e => handleChange(e)}
/>
</div>
<div className="">
<label for="eFormControlInput1">Session</label>
<input
type="text"
value={session}
name="session"
placeholder="1"
className="input form-control"
onChange={e => handleChange(e)}
/>
</div>
<div >
<label for="eFormControlInput1">City</label>
<input
type="text"
value={city}
name="city"
placeholder="London"
className="input form-control"
onChange={e => handleChange(e)}
/>
</div> 
<div className="">
<label for="eFormControlInput1">Latitude</label>
<input
type="text"
value={latitude}
name="latitude"
placeholder="51.13"
className="input form-control"
onChange={e => handleChange(e)}
/>
Longitude{" "}
<input
type="text"
value={longitude}
name="longitude"
placeholder="-0.107"
className="input form-control"
onChange={e => handleChange(e)}
/>
</div>
<section >
<button >
Submit
</button>
</section>
</div>
</form>
{/* <form
className="form-group ml-3"
onSubmit={e => handleSubmit(e)}
action="/register"
>
<input
type="text"
value={date}
name="date"
placeholder="date"
className="input form-control"
onChange={e => handleChange(e)}
/>
<br />
<input
type="text"
value={name}
name="name"
placeholder="name"
className="input form-control"
onChange={e => handleChange(e)}
/>
<br />
<input
type="text"
value={session}
name="session"
className="input form-control"
placeholder="Session"
onChange={e => handleChange(e)}
/>
<br />
<input
type="text"
value={city}
name="city"
className="input form-control"
placeholder="City"
onChange={e => handleChange(e)}
/>
<br />
<section className="btnSection">
<button className="nav-link nav-btn-help media-display-none">
Submit
</button>
</section>
</form> */}
</div>
);
      {/* <form
        className="form-group ml-3"
        onSubmit={e => handleSubmit(e)}
        action="/register"
      >
        <input
          type="text"
          value={date}
          name="date"
          placeholder="date"
          className="input form-control"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          value={name}
          name="name"
          placeholder="name"
          className="input form-control"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          value={session}
          name="session"
          className="input form-control"
          placeholder="Session"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          value={city}
          name="city"
          className="input form-control"
          placeholder="City"
          onChange={e => handleChange(e)}
        />
        <br />
        <section className="btnSection">
          <button className="nav-link nav-btn-help media-display-none">
            Submit
          </button>
        </section>
      </form> */}
    </div>
  );
}
