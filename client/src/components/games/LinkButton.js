import React from 'react';
import {Link} from 'react-router-dom';

const LinkButton = (props) => {
  const {name, to, size} = props;
  return (
    <Link
      className={`btn btn-primary ${size} btn-block text-capitalize text-center`}
      to={to}
    >
      {name}
    </Link>
  );
};

export default LinkButton;
