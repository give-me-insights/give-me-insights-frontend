import React from 'react';

import { OverridableStringUnion } from '@mui/types';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


type SiteHeaderFragmentProps = {
  xs: number,
  children: JSX.Element
}

export const SiteHeaderFragment = ({xs, children}: SiteHeaderFragmentProps) => {
  return (
    <Grid item xs={xs}>
      {children}
    </Grid>
  )
}

// TODO [low][Codequality] - check inheritances for types.
//  All properties except children from type `SiteHeaderFragmentProps` should be valid in Button as well
type SiteHeaderButtonProps = {
  displayedText: string,
  xs: number,
  variant: OverridableStringUnion<'text' | 'outlined' | 'contained'>,
  handleClick: CallableFunction
}

// TODO [low][Codequality] - check inheritances for Properties.
//    All Properties of grid should be valid here
export const SiteHeaderButton = ({displayedText, xs, variant, handleClick}: SiteHeaderButtonProps) => {
  return (
    <SiteHeaderFragment xs={xs}>
      <Button
        variant={variant}
        onClick={() => handleClick()}
        fullWidth
      >
        {displayedText}
      </Button>
    </SiteHeaderFragment>
  )
}

type SiteHeaderProps = {
  fragments: JSX.Element[]
}

export const SiteHeader = ({fragments}: SiteHeaderProps) => {
  return (
    <Box sx={{flexGrow: 2}} m={1}>
      <Grid container spacing={2}>
        {
          fragments.map((siteHeaderFragment, index) =>
            <React.Fragment key={index}>{siteHeaderFragment}</React.Fragment> )
        }
      </Grid>
    </Box>
  );
};
