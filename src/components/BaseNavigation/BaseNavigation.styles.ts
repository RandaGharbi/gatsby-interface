import { Theme, ThemeCss } from "../../theme"
import { Interpolation } from "@emotion/core"

const hamburgerIconStylesShared: ThemeCss = theme => {
  return {
    width: 24,
    height: `3px`,
    borderRadius: theme.radii[1],
    background: theme.colors.black,
    margin: `10px 0`,
    position: `relative`,
    zIndex: 1000,
    "&:before, &:after": {
      borderRadius: theme.radii[1],
      height: `3px`,
      background: theme.colors.black,
      content: `" "`,
      position: `absolute`,
      right: 0,
      transition: `transform 250ms cubic-bezier(.68,-.55,.265,1.55)`,
    },
    ":before": {
      top: -7,
      width: 20,
    },
    ":after": {
      top: 7,
      width: 16,
    },
    "&.active": {
      background: `0 0`,
      "&:before, &:after": {
        top: 0,
        width: 24,
      },
      "&:before": {
        transform: `rotate(45deg)`,
      },
      "&:after": {
        transform: `rotate(-45deg)`,
      },
      "&:hover": {
        transform: `scale(1.2)`,
      },
    },
  }
}

const hamburgerIconStylesSharedInverted: ThemeCss = theme => {
  const background = theme.colors.white

  return {
    background,
    "&:before, &:after": {
      background,
    },
    "&.active": {
      "&:before, &:after": {
        background,
      },
    },
  }
}

const baseNavigationItemCss: ThemeCss = theme => ({
  display: `inline-flex`,
  position: `relative`,
  color: theme.colors.black,
  // Show dropdown menu on hover, if exists
  "&:hover > div": baseNavigationDropdownOpenStyles(theme),
})

const baseNavigationItemInvertedCss: ThemeCss = theme => ({
  color: theme.colors.white,
})

const baseNavigationDropdownStyles: (
  theme: Theme,
  mobileNavMediaQuery: string
) => Interpolation = (_theme, mobileNavMediaQuery) => ({
  display: `none`,
  position: `absolute`,
  top: `100%`,
  left: `50%`,
  transform: `translateX(-50%)`,

  // regretably our mobileNavMediaQuery styling is NOT 'mobile-first'
  // so we have to 'remove' default style for mobile version
  [mobileNavMediaQuery]: {
    position: `relative`,
    left: `auto`,
    transform: `none`,
    top: `auto`,
  },
})

const baseNavigationDropdownMeasureStyles: ThemeCss = _theme => ({
  visibility: `hidden`,
  display: `block`,
})

const baseNavigationDropdownOpenStyles: ThemeCss = _theme => ({
  display: `block`,
})

const baseNavigationDropdownListStyles: ThemeCss = theme => ({
  margin: 0,
  padding: `${theme.space[4]} 0`,
  listStyle: `none`,
})

const baseNavigationDropdownToggleCss: ThemeCss = theme => ({
  color: theme.colors.black,
  background: `inherit`,
})

const baseNavigationDropdownToggleInvertedCss: ThemeCss = theme => ({
  color: theme.colors.white,
  background: 0,
})

export const baseNavigationButtonCss: ThemeCss = theme => ({
  fontSize: theme.fontSizes[2],
  fontWeight: `bold`,
  background: theme.colors.gatsby,
  border: 0,
  color: theme.colors.white,
  ":focus, &:hover:not([disabled])": {
    background: theme.colors.purple[70],
    border: 0,
    color: theme.colors.white,
  },
})

export const baseNavigationButtonInvertedCss: ThemeCss = theme => ({
  background: theme.colors.white,
  border: `1px solid ${theme.colors.purple[20]}`,
  color: theme.colors.purple[50],
  ":focus, &:hover:not([disabled])": {
    background: theme.colors.white,
    border: `1px solid ${theme.colors.purple[60]}`,
    color: theme.colors.purple[60],
  },
})

const baseStyles = {
  navigation: {
    default: {
      width: `100%`,
    },
  },
  hamburger: {
    default: {
      display: `none`,
    },
    mobile: {
      background: `none`,
      border: 0,
      display: `block`,
      marginLeft: `auto`,
      marginTop: -6,
      padding: 0,
      position: `relative`,
      zIndex: 22,
      cursor: `pointer`,
      transition: `all 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
    },
  },
  hamburgerIcon: (isInverted: boolean): ThemeCss => theme => [
    hamburgerIconStylesShared(theme),
    isInverted && hamburgerIconStylesSharedInverted(theme),
  ],
  nav: {
    default: {},
    mobile: (isMobileNavOpen: boolean): ThemeCss => {
      return _theme => ({
        display: isMobileNavOpen ? `block ` : `none`,
      })
    },
  },
  list: {
    wrapper: {
      width: `100%`,
      display: `flex`,
      justifyContent: `space-between`,
    },
    spacer: {
      flex: 1,
    },
    side: {
      listStyle: `none`,
      margin: 0,
      padding: 0,
    },
    leftSide: {
      display: `flex`,
      justifyContent: `flex-start`,
      flex: 1,
    },
    rightSide: {
      display: `flex`,
      justifyContent: `flex-end`,
    },
  },
  item: (isInverted: boolean): ThemeCss => {
    return theme => [
      baseNavigationItemCss(theme),
      isInverted && baseNavigationItemInvertedCss(theme),
    ]
  },
  dropdown: (
    isDropdownOpen: boolean,
    isMeasured: boolean,
    mobileNavMediaQuery: string
  ): ThemeCss => {
    return theme => [
      baseNavigationDropdownStyles(theme, mobileNavMediaQuery),
      isMeasured && baseNavigationDropdownMeasureStyles(theme),
      isDropdownOpen && baseNavigationDropdownOpenStyles(theme),
    ]
  },
  dropdownList: (): ThemeCss => {
    return theme => baseNavigationDropdownListStyles(theme)
  },
  dropdownToggle: (isInverted: boolean): ThemeCss => {
    return theme => [
      baseNavigationDropdownToggleCss(theme),
      isInverted && baseNavigationDropdownToggleInvertedCss(theme),
    ]
  },
  button: (isInverted: boolean): ThemeCss => {
    return theme => [
      baseNavigationButtonCss(theme),
      isInverted && baseNavigationButtonInvertedCss(theme),
    ]
  },
}

export default baseStyles
