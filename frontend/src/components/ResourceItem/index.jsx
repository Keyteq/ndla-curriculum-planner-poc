import React from 'react';
import PropTypes from 'prop-types';

import s from './resourceItem.module.scss';

const ResourceItem = ({
  title,
  tags,
  resourceGroup,
  shareable,
  showPlanLink,
}) => (
  <article className={s.wrapper}>
    <div style={{ backgroundColor: `var(--lp-${resourceGroup}-item-bg)` }} className={s.content}>
      <a href="/" className={s.link}>
        <h1 className={s.title}>{title}</h1>
      </a>

      {(Array.isArray(tags) || shareable) && (
        <div className={s.rightContainer}>
          <div className={s.tagsContainer}>
            {tags.subject && (
            <ul className={s.tagsList}>
              {tags.subject.map((tag) => (
                <li
                  className={s.tag}
                  style={{
                    backgroundColor: 'var(--subject-tag-bg)',
                    color: 'var(--subject-tag-text-color)',
                  }}
                  key={tag.id}
                >
                  {tag.label}
                </li>
              ))}
            </ul>
            )}

            {tags.type && (
            <ul className={s.tagsList}>
              {tags.type.map((tag) => (
                <li
                  className={s.tag}
                  style={{
                    backgroundColor: 'var(--type-tag-bg)',
                    color: 'var(--type-tag-text-color)',
                  }}
                  key={tag.id}
                >
                  {tag.label}
                </li>
              ))}
            </ul>
            )}
          </div>

          {shareable && <input className={s.checkbox} type="checkbox" name={resourceGroup} />}
        </div>
      )}
    </div>

    {typeof showPlanLink === 'function' && (
      <button type="button" className={s.planLinkButton} onClick={showPlanLink}>
        <span>Se plantilknytning</span>
      </button>
    )}
  </article>
);

ResourceItem.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.shape({
    subject: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })),
    type: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })),
  }),
  resourceGroup: PropTypes.string,
  shareable: PropTypes.bool,
  showPlanLink: PropTypes.func,
};

export default ResourceItem;
