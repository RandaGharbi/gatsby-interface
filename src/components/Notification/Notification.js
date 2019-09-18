/** @jsx jsx */
import { jsx } from "@emotion/core"
import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { MdClose, MdArrowForward } from "react-icons/md"

import styles from "../../theme/styles/notification"
import tones from "../../theme/tones"
import { spaces, palette } from "../../utils/presets"
import { Link } from "../Link"
import { Button } from "../core/Button"

import { NOTIFICATION_TONES, NOTIFICATION_VARIANTS } from "../../utils/options"

const asOptions = {
  div: `div`,
  section: `section`,
}
function Notification({
  css,
  children,
  as = `div`,
  tone = `BRAND`,
  variant = `PRIMARY`,
  icon: Icon,
  content,
  contentAs = `span`,
  linkUrl,
  linkText,
  showNotification = true,
  closeNotificationButton,
  ...rest
}) {
  const [showNotificationState, setNotificationState] = useState(
    showNotification
  )
  const Component = asOptions[as]

  if (!showNotificationState) return null

  return (
    <Component
      css={{
        ...styles.base,
        ...styles.variants[variant](tones[tone]),
        ...css,
      }}
      {...rest}
    >
      {content && (
        <Notification.Content tone={tone} as={contentAs}>
          {Icon && <Icon />}
          {content}
        </Notification.Content>
      )}

      {linkUrl && (
        <Notification.Link to={linkUrl}>
          {linkText && (
            <Fragment>
              {linkText} <MdArrowForward />
            </Fragment>
          )}
        </Notification.Link>
      )}

      {closeNotificationButton && (
        <Button
          css={{
            padding: `0`,
            minHeight: `auto`,
            svg: { fill: palette.grey[`400`] },
            width: spaces.m,
          }}
          type="button"
          onClick={() => setNotificationState(!showNotificationState)}
          variant="GHOST"
        >
          <MdClose />
        </Button>
      )}
      {children}
    </Component>
  )
}

Notification.propTypes = {
  children: PropTypes.any,
  as: PropTypes.oneOf([`div`, `section`]),
  variant: PropTypes.oneOf(NOTIFICATION_VARIANTS),
  tone: PropTypes.oneOf(NOTIFICATION_TONES),
  content: PropTypes.string,
  contentAs: PropTypes.string,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
  closeNotificationButton: PropTypes.bool,
  showNotification: PropTypes.bool,
}

const contentAsOption = {
  div: `div`,
  span: `span`,
}

Notification.Content = ({
  children,
  css,
  as = `span`,
  tone = `BRAND`,
  ...rest
}) => {
  const Component = contentAsOption[as]
  return (
    <Component
      css={{
        display: `flex`,
        alignItems: `center`,
        ...css,
        svg: {
          fill: tones[tone].dark,
          marginRight: spaces.xs,
        },
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

Notification.Content.propTypes = {
  children: PropTypes.any,
  as: PropTypes.oneOf([`div`, `span`]),
  tone: PropTypes.oneOf(NOTIFICATION_TONES),
}

Notification.Link = props => <Link {...props} />

export default Notification
