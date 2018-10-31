import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Button from '../Button';

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z" />
  </svg>
);

const File = () => (
  <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-1024-864q0-14 9-23t23-9h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64zm736 224q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704zm0 256q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704z" />
  </svg>
)

const Dir = ({ state }) => (state === 'open' ? (
  <svg width="23" height="20" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M1845 931q0-35-53-35h-1088q-40 0-85.5 21.5t-71.5 52.5l-294 363q-18 24-18 40 0 35 53 35h1088q40 0 86-22t71-53l294-363q18-22 18-39zm-1141-163h768v-160q0-40-28-68t-68-28h-576q-40 0-68-28t-28-68v-64q0-40-28-68t-68-28h-320q-40 0-68 28t-28 68v853l256-315q44-53 116-87.5t140-34.5zm1269 163q0 62-46 120l-295 363q-43 53-116 87.5t-140 34.5h-1088q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h544q92 0 158 66t66 158v160h192q54 0 99 24.5t67 70.5q15 32 15 68z" />
  </svg>
) : (
  <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M1600 1312v-704q0-40-28-68t-68-28h-704q-40 0-68-28t-28-68v-64q0-40-28-68t-68-28h-320q-40 0-68 28t-28 68v960q0 40 28 68t68 28h1216q40 0 68-28t28-68zm128-704v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z" />
  </svg>
));

const Explorer = ({ content, onItemClick, onItemKeyPress }) => (
  <div>
    <ul>
      {content.parent && (
        <li>
          <Button
            type="button"
            onClick={onItemClick}
            onKeyPress={onItemKeyPress}
            data-path={content.parent}
          >
            <>
              <Arrow />
              {`../${content.parent}`}
            </>
          </Button>
        </li>
      )}
      <li>
        <Dir state="open" />
        {content.data}
      </li>
      <ul>
        {content.children.map(child => (
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
                <Dir state="closed" />
                {child.data}
              </Button>
            ) : (
              <>
                <File />
                {child.data}
              </>
            )}
          </li>
        ))}
      </ul>
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
