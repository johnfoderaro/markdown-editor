import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import NodeList from '../../blocks/NodeList';
import Node from '../../blocks/Node';
import Arrow from '../../blocks/Arrow';
import Dir from '../../blocks/Dir';
import File from '../../blocks/File';

import Ul from '../../elements/Ul';
import Li from '../../elements/Li';
import LinkButton from '../../elements/LinkButton';

const Explorer = ({ content, onItemClick, onItemKeyPress }) => (
  <NodeList>
    <Ul>
      {content.parent && (
        <Li>
          <Node>
            <Node.Icon>
              <Arrow width="20" height="20" />
            </Node.Icon>
            <Node.Name>
              <LinkButton
                type="button"
                onClick={onItemClick}
                onKeyPress={onItemKeyPress}
                data-path={content.parent}
              >
                {`../${content.parent}`}
              </LinkButton>
            </Node.Name>
          </Node>
        </Li>
      )}
      <Li>
        <Node>
          <Node.Icon>
            <Dir state="open" width="23" height="20" />
          </Node.Icon>
          <Node.Name>
            {content.name}
          </Node.Name>
        </Node>
      </Li>
      <Ul>
        {content.children.map(child => (
          <Li
            key={child.name}
          >
            {child.type === 'directory' ? (
              <Node>
                <Node.Icon>
                  <Dir state="closed" width="20" height="20" />
                </Node.Icon>
                <Node.Name>
                  <LinkButton
                    type="button"
                    onClick={onItemClick}
                    onKeyPress={onItemKeyPress}
                    data-path={child.name}
                  >
                    {child.name}
                  </LinkButton>
                </Node.Name>
              </Node>
            ) : (
              <Node>
                <Node.Icon>
                  <File width="20" height="20" />
                </Node.Icon>
                <Node.Name>
                  <LinkButton
                    type="button"
                    onClick={onItemClick}
                    onKeyPress={onItemKeyPress}
                    data-path={child.name}
                  >
                    {child.name}
                  </LinkButton>
                </Node.Name>
              </Node>
            )}
          </Li>
        ))}
      </Ul>
    </Ul>
  </NodeList>
);

Explorer.propTypes = {
  content: PropTypes.shape({
    name: PropTypes.string,
    parent: PropTypes.string,
    children: PropTypes.array,
    type: PropTypes.string,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onItemKeyPress: PropTypes.func.isRequired,
};

export default hot(module)(Explorer);
