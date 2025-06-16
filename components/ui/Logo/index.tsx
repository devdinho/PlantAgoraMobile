import React from 'react';
import { Image } from 'react-native';

import { ImageStyle, StyleProp } from 'react-native';

interface LogoProps {
    style?: StyleProp<ImageStyle>;
    [key: string]: any;
}

export default function Logo({ style, ...props }: LogoProps) {
    const logoStyle = {
        width: 240,
        height: 240,
        borderRadius: 240,
    };
    const source = require('@/assets/images/logo.png');

  return <Image style={[logoStyle, style]} source={source} {...props}/>
}