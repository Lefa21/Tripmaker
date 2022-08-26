import React from 'react';
import { Icon } from '@iconify/react';

function Cards() {

  return (
<div className="car">
    <ul className="menudestinationcles">
        <li>
        <Icon icon="bx:drink" />
        </li>
        <li>
        <Icon icon="bx:film" />
        </li>
        <li>
        <Icon icon="bx:store-alt" />
        </li>

    </ul>
    <img src='../images/tour3.jpg' alt=""></img>
    <div className="con-text">
        <h2>
            Paris
        </h2>
        <p>
        Paris est la capitale de la France. Divisée en vingt arrondissements, elle est le chef-lieu de la région Île-de-France et le siège de la métropole du Grand Paris. 
            <button>
                Détails
            </button>
        </p>

    </div>
   
</div>
  );
}

export default Cards;
