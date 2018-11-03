import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Node from '../../blocks/Node';
import Arrow from '../../blocks/Arrow';
import Dir from '../../blocks/Dir';
import File from '../../blocks/File';

import Ul from '../../elements/Ul';
import Li from '../../elements/Li';
import Button from '../../elements/Button';

const Explorer = ({ content, onItemClick, onItemKeyPress }) => (
  <Ul>
    {content.parent && (
      <Li>
        <Node>
          <Node.Icon>
            <Arrow />
          </Node.Icon>
          <Node.Name>
            <Button
              type="button"
              onClick={onItemClick}
              onKeyPress={onItemKeyPress}
              data-path={content.parent}
            >
              {`../${content.parent}`}
            </Button>
          </Node.Name>
        </Node>
      </Li>
    )}
    <Li>
      <Node>
        <Node.Icon>
          <Dir state="open" />
        </Node.Icon>
        <Node.Name>
          {content.data}
        </Node.Name>
      </Node>
    </Li>
    <Ul>
      {content.children.map(child => (
        <Li
          key={child.data}
        >
          {child.type === 'directory' ? (
            <Button
              type="button"
              onClick={onItemClick}
              onKeyPress={onItemKeyPress}
              data-path={child.data}
            >
              <Dir state="closed" />
              {child.data}
            </Button>
          ) : (
            <>
              <File />
              {child.data}
            </>
          )}
        </Li>
      ))}
    </Ul>
  </Ul>
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
