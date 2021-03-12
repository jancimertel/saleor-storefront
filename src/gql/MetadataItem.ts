export interface MetadataItem {
  key: string;
  value: string;
}

export interface ObjectWithMetadata {
  privateMetadata: MetadataItem[];
  metadata: MetadataItem[];
}
