import { getDataset } from '@/lib/loadDataset';
import { Header } from '@/components/Header';
import { Explorer } from '@/components/Explorer';

export default function Page() {
  const dataset = getDataset();

  return (
    <div>
      <Header title={dataset.meta.title} updateDate={dataset.meta.updateDate} />
      <Explorer dataset={dataset} />
    </div>
  );
}
