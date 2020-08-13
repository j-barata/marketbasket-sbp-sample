/*
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.github.market.basket.sbp.sample.plugins.onions;

import com.github.market.basket.sbp.sample.api.IVegetable;
import org.pf4j.Extension;
import org.pf4j.PluginWrapper;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Extension
public class OnionsExtension implements IVegetable {

    @Override
    public String name() {
        return "Onions";
    }

    @Override
    public String color() {
        return "Brown";
    }

    @Override
    public List<URL> resources() {
        List<URL> resources = new ArrayList<>();
        try {
            PluginWrapper wrapper = OnionsPlugin.INSTANCE.getWrapper();
            URL images = wrapper.getPluginClassLoader().getResource("public/onions");
            for (String file : new File(images.getPath()).list()) {
                resources.add(new File(images.getPath().concat(File.separator + file)).toURI().toURL());
            }
        } finally {
            return resources;
        }
    }
}
