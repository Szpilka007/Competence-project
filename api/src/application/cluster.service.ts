import { Injectable, Logger } from "@nestjs/common";
import KMeans from "tf-kmeans";
import tf, { data } from "@tensorflow/tfjs";

type Dataset = (number | number[] | number[][] | number[][][] | number[][][][] | number[][][][][] | number[][][][][][]);

@Injectable()
export class ClusterService {
  public constructor(
    clusters: number,
    maxIterations: number
  ) {
    this.kmeans = new KMeans({
      k: clusters,
      maxIter: maxIterations,
      distanceFunction: KMeans.EuclideanDistance
    });
  }
  
  private kmeans: KMeans;
  private predictions: tf.Tensor<tf.Rank>;
  private logger: Logger = new Logger(ClusterService.name);

  public clusterDataset = (dataset: Dataset): Dataset => {
    this.predictions = this.kmeans.Train(tf.tensor(dataset));
    return this.predictions.arraySync();
  }

  public getCentroids = (): Dataset => {
    return this.kmeans.Centroids().arraySync();
  }

  public assignClusters = (dataset: Dataset): Dataset => {
    return this.kmeans.Predict(tf.tensor(dataset)).arraySync();
  }
}
