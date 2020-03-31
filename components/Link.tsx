/* eslint-disable jsx-a11y/anchor-has-content */
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";
import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

type NextComposedProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  NextLinkProps;

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...other
    } = props;

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
);

interface ILinkPropsBase {
  activeClassName?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
  naked?: boolean;
}

type LinkProps = ILinkPropsBase & NextComposedProps & Omit<MuiLinkProps, "ref">;

function RouterLink(props: LinkProps) {
  const router = useRouter();
  const {
    activeClassName = "active",
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      {...other}
    />
  );
}

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink {...props} innerRef={ref} />
));