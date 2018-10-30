import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Button from '../Button';

const Explorer = ({ content, onItemClick, onItemKeyPress }) => (
  <div>
    <h1>
      {'Content'}
    </h1>
    <ul>
      {content.parent && (
        <li>
          <Button
            type="button"
            onClick={onItemClick}
            onKeyPress={onItemKeyPress}
            data-path={content.parent}
          >
            {`../${content.parent}`}
          </Button>
        </li>
      )}
      {content.children.sort((a, b) => (a.data > b.data ? 1 : -1)).map(child => (
        <li
          key={child.data}
        >
          {child.type === 'directory' ? (
            <Button
              type="button"
              onClick={onItemClick}
              onKeyPress={onItemKeyPress}
              data-path={child.data}
            >
              {child.data}
            </Button>
          ) : (
            <>
              {child.data}
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

Explorer.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.string.isRequired,
    parent: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onItemKeyPress: PropTypes.func.isRequired,
};

export default hot(module)(Explorer);
