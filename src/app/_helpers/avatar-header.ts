/**
 * Created by awedag on 29.12.17.
 */


export class AvatarConfig {
  filetype: string;
  avatarHeader: string;
}

export const avatarFileTypes: AvatarConfig[] = [
  {filetype: 'png', avatarHeader: 'data:image/png;base64,'},
  {filetype: 'jpg', avatarHeader: 'data:image/jpg;base64,'}
];

export function avatarHeader(filetype: string): string{
  return avatarFileTypes.find((f) => f.filetype === filetype).avatarHeader;
}
