import P from 'prop-types';

export const Heading = ({ children }) => {
  return <h1>{children}</h1>;
};

Heading.propTypes = {
  children: P.node.isRequired,
};
