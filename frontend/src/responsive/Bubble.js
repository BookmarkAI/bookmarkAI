import './App.scss';

function Bubble(props) {

  return (
    <div className="Bubble">
      <span class="skill-item aos-init aos-animate" data-aos="fade-up" data-aos-duration="500" data-aos-delay={props.delay}>
        {props.name}
      </span>
    </div>
  );
}

export default Bubble;