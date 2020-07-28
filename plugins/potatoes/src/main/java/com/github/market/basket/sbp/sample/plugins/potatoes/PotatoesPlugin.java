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
package com.github.market.basket.sbp.sample.plugins.potatoes;

import com.github.market.basket.sbp.sample.api.IFruit;
import com.github.market.basket.sbp.sample.api.IVegetable;
import org.laxture.sbp.SpringBootPlugin;
import org.laxture.sbp.spring.boot.SpringBootstrap;
import org.pf4j.PluginWrapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;

public class PotatoesPlugin extends SpringBootPlugin {

    public static PotatoesPlugin INSTANCE;

    public PotatoesPlugin(PluginWrapper wrapper) {
        super(wrapper);
        INSTANCE = this;
    }

    @Override
    protected SpringBootstrap createSpringBootstrap() {
        return new SpringBootstrap(this, PotatoesPluginStarter.class)
                .addSharedBeanName("vegetablesComponent");
    }

    @Override
    public void start() {
        super.start();
    }

    @Override
    public void stop() {
        super.stop();
    }

    @SpringBootApplication
    static class PotatoesPluginStarter {
        public static void main(String[] args) {
            SpringApplication.run(PotatoesPluginStarter.class, args);
        }

        @Bean
        @ConditionalOnMissingBean(name = "vegetablesComponent")
        public IVegetable vegetablesComponent() {
            return new PotatoesComponent();
        }
    }
}