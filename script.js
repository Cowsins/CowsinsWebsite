const DOM = {
    class: {
      transition: (element, name, duration, delay) => {
        const doTransition = () => {
          if(element.classList.contains(name)) {
            element.classList.remove(name);
          }
  
          element.classList.add(name)
  
          setTimeout(() => element.classList.remove(name), duration);   
        }
         
        if(delay) {
          setTimeout(doTransition, delay);
        } else {
          doTransition();
        }
      }
    }
  }
  
  const N = {
    clamp: (min, value, max) => Math.min(Math.max(min, value), max)
  }
  
  const Transform = {
    rangify: (value, percent) => { 
      const numerator = percent >= 0.5 
        ? (percent - 0.5) 
        : (0.5 - percent) * -1;
      
      const adjustedPercent = (numerator / 0.5);
      
      return value * adjustedPercent;
    }
  }
  
  const display = document.getElementById("card-display");
  
  display.onmousemove = e => {
    const rect = display.getBoundingClientRect();
  
    const mouseX = e.clientX - rect.left,
          mouseY = e.clientY - rect.top;
    
    const xPercent = mouseX / rect.width,
          yPercent = mouseY / rect.height;
  
    const xDeg = Transform.rangify(10, yPercent),
          yDeg = Transform.rangify(-10, xPercent);
    
    display.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  };
  
  display.onmouseleave = e => {
    DOM.class.transition(display, "transition", 500);
  
    display.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
  };
  const releaseCard = element => {
    if(
      !element.classList.contains("selected") && 
      !element.classList.contains("chef-reappear")
    ) {
      DOM.class.transition(element, "selected", 1000);
  
      DOM.class.transition(element, "chef-reappear", 250, 1000);
    }
  }
  
  for(const card of document.querySelectorAll(".card-wrapper")) {
    card.onmousemove = e => moveChef(e, card);
  
    card.onmouseup = () => releaseCard(card);  
  };

  const circle = document.getElementById("circle");
  const circleText = document.getElementById("circle").children[0];
  const gradient = document.getElementById("gradient");

document.addEventListener("mousemove", (event) => {
  const x = event.pageX;
  const y = event.pageY;

  circle.style.left = x + "px";
  circle.style.top = y + "px";
});

function mouseHighlight(color)
{
  circle.style.transform = "scale(5)";
  circle.style.backgroundColor = "rgb(238, 181, 181)"; 
  circleText.style.display = "block"; 
  gradient.style.backgroundColor = color; 
  gradient.style.opacity = "15%"; 
}

function mouseHighlightStop()
{
  circle.style.transform = "scale(1)";
  circle.style.backgroundColor = "rgb(109, 109, 109)"; 
  circleText.style.display = "none"; 
  gradient.style.opacity = "0%"; 
}